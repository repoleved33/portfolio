const blogData = [
  {
    id: 1,
    slug: "fragrance-data-pipeline-python-supabase",
    title:
      "Building an Automated Data Pipeline: From CSV to Supabase with Python",
    date: "2026.03.18",
    category: "Development",
    tags: ["Python", "Pandas", "BeautifulSoup", "Supabase", "Automation"],
    summary:
      "A deep dive into building a robust data pipeline that scrapes perfume images, cleans CSV data, and performs batch uploads to Supabase.",
    content: `
### 1. The Challenge: Bridging the Gap between Raw Data and UI
For my **"Hyang(Fragrance Tracker)"** app, I had a raw dataset in CSV format, but it lacked the visual element—image URLs. My goal was to build a pipeline that could:
1. Parse a large, semi-colon separated CSV file.
2. Visit each perfume's detail page to scrape the official image URL.
3. Clean and transform the data into a structured format.
4. Efficiently upload the data to **Supabase (PostgreSQL)** in batches.

### 2. The Implementation: Smart Scraping & Data Cleaning
I used \`Pandas\` for data manipulation and \`BeautifulSoup\` for targetted scraping. To avoid being blocked by the server, I implemented a randomized delay.

* **Anti-Blocking Strategy:** Instead of static sleep, I used \`time.sleep(random.uniform(0.3, 0.7))\` to mimic human browsing behavior.
* **Fallback Logic:** If the primary image tag (\`itemprop='image'\`) wasn't found, the script searches for alternative sources within the HTML.

\`\`\`python
def get_perfume_image(detail_url, p_name):
    # Mimic a real browser
    headers = {"User-Agent": "Mozilla/5.0 ..."}
    
    # Random sleep to prevent IP blocking
    time.sleep(random.uniform(0.3, 0.7))
    response = session.get(detail_url, headers=headers)
    
    soup = BeautifulSoup(response.text, 'html.parser')
    img_tag = soup.find('img', {'itemprop': 'image'})
    
    return img_tag.get('src') if img_tag else ""
\`\`\`

### 3. Data Transformation and Batch Upload
To ensure high performance and reduce API overhead, I didn't upload rows one by one. Instead, I collected records into a list and used **Batch Inserts**.

* **Complex Data Mapping:** I transformed individual 'mainaccord' columns from the CSV into a structured JSON-like list (\`main_accords\`) before uploading.
* **Error Handling:** Implemented \`try-except\` blocks for both CSV parsing (handling bad lines) and Supabase insertion to ensure the script doesn't crash mid-process.

\`\`\`python
# Batch processing (10 records at a time)
if len(records) >= 10:
    try:
        supabase.table("main_perfume_list").insert(records).execute()
        print(f"✅ Uploaded batch! Total: {success_count}")
        records = [] # Reset buffer
        time.sleep(0.2) # Avoid API rate limits
    except Exception as e:
        print(f"❌ Insertion Error: {e}")
\`\`\`

### 4. Key Takeaways
1. **Data Resilience:** Handling different CSV delimiters (\`;\`) and encoding (\`latin1\`) is crucial when working with global datasets.
2. **Efficiency through Batching:** Moving from single inserts to batch inserts (10+ records) significantly improved the upload speed.
3. **Automated Asset Collection:** Successfully mapped thousands of perfume names to their respective image URLs, providing a rich visual database for my React Native app.
    `,
  },
  {
    id: 2,
    slug: "optimizing-search-performance-infinite-scroll",
    title:
      "Optimizing Search UX: Implementing Infinite Scroll and Rendering Efficiency",
    date: "2026.03.25",
    category: "Development",
    tags: ["React Native", "Performance", "Infinite Scroll", "UX", "Supabase"],
    summary:
      "A deep dive into improving search performance by implementing a paginated infinite scroll and optimizing the rendering lifecycle of large perfume datasets.",
    content: `
### 1. The Challenge: Handling Large Datasets in Search Modals
As the fragrance database expanded to thousands of records, the search functionality in **"Hyang"** faced a critical performance bottleneck. Fetching and rendering the entire result set at once caused:
1. **Initial Render Lag:** The modal took over 500ms to appear, creating a "frozen" feeling.
2. **Memory Overload:** High memory consumption led to potential crashes on lower-end devices.
3. **API Overhead:** Fetching unnecessary data that the user might never scroll to.

### 2. Implementation: Infinite Scroll & Pagination
To solve this, I shifted from a bulk-fetch approach to a **Paginated Infinite Scroll** strategy using \`FlatList\`.

* **On-Demand Fetching:** I implemented a \`page\` state and used the \`onEndReached\` prop to trigger the next batch of data only when the user scrolls near the bottom (Threshold: 0.5).
* **State Management:** New results are appended to the existing list using the spread operator, ensuring a seamless vertical scrolling experience without losing previous data.

\`\`\`typescript
const loadMoreResults = async () => {
  if (loading || !hasMore || !searchKeyword.trim()) return;

  setLoading(true);
  const nextPage = page + 1;
  const newResults = await searchPerfumes(searchKeyword, nextPage);

  if (newResults.length < 50) setHasMore(false); // Stop when data ends

  setSearchResults((prev) => [...prev, ...newResults]);
  setPage(nextPage);
  setLoading(false);
};
\`\`\`

### 3. Boosting Perceived Performance
Technical speed is only half the battle; user perception matters just as much. I implemented several "Micro-optimizations" to make the search feel instantaneous.

* **Activity Indicators:** Integrated a loading spinner in the \`ListFooterComponent\` to provide real-time feedback during background data fetching.
* **Smart Keyboard Handling:** Used \`keyboardShouldPersistTaps="handled"\` to ensure search results are immediately selectable without needing an extra tap to dismiss the keyboard.
* **Auto-Focus Strategy:** Triggered \`autoFocus={true}\` on the search input when the modal mounts, reducing the friction to start a search.

### 4. Key Takeaways
1. **Windowing is Mandatory:** For lists exceeding 100 items, using \`FlatList\`'s virtualization (initialNumToRender, maxToRenderPerBatch) is essential for maintaining 60 FPS.
2. **Defensive API Logic:** Using the \`hasMore\` flag prevents wasteful network requests once the database is exhausted, improving overall app stability.
3. **The Power of Feedback:** Even if data takes time to load, providing clear visual indicators (Skeleton or Spinners) significantly improves the **Perceived Performance** of the application.
    `,
  },
  {
    id: 3,
    slug: "react-native-ui-optimization-scentlog",
    title:
      "Refactoring for Scalability: Component Abstraction and Memoization in React Native",
    date: "2026.03.26",
    category: "Development",
    tags: [
      "React Native",
      "TypeScript",
      "Optimization",
      "Refactoring",
      "Context API",
    ],
    summary:
      "A technical overview of standardizing UI components, optimizing heavy data computations with useMemo, and implementing defensive rendering for a fragrance tracking app.",
    content: `
### 1. The Challenge: Tech Debt in a Growing UI
As the **"ScentLog"** and **"Receipt"** features grew, the codebase faced two main issues:
1. **Prop Drilling & Bloated Styles:** Inline styles and duplicated header logic made the UI inconsistent across different screens.
2. **Performance Bottlenecks:** Calculating top fragrance statistics from large log arrays during every re-render caused noticeable lag.

### 2. Implementation: Modular Header & Style Decoupling
To achieve a "Pixel-Perfect" look across the app, I moved away from hardcoded margins and centralized the layout logic.

* **Safe Area Integration:** Instead of static padding, I used \`useSafeAreaInsets\` to dynamically calculate header positions, ensuring the UI remains consistent across various notch designs (iOS/Android).
* **Style Externalization:** I decoupled business logic from presentation by moving complex \`StyleSheet\` objects into dedicated \`*.styles.ts\` modules.

\`\`\`typescript
// CommonHeader.styles.ts
export const headerStyles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    backgroundColor: Colours.background,
    flexDirection: "column",
    gap: 15,
  },
  // Reusable across Shelf, Log, and Receipt screens
});
\`\`\`

### 3. Performance Optimization with useMemo
The **"HyangReceipt"** feature requires processing hundreds of fragrance logs to generate a "Top 10" list. To prevent frame drops during modal animations or tab switches, I implemented strict memoization.

* **Computational Efficiency:** By wrapping the filtering and sorting logic in \`useMemo\`, the expensive O(n log n) operations only trigger when the raw \`scentLogs\` or the selected \`period\` (7d/30d) changes.
* **Referential Identity:** This also prevents unnecessary re-renders of child components (\`ItemRow\`) by maintaining a stable reference to the processed data.

\`\`\`typescript
const topTenPerfumes = useMemo(() => {
  return scentLogs
    .filter(log => isWithinPeriod(log.date, period))
    .reduce(calculateFrequency, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}, [scentLogs, period]); // Optimized dependency array
\`\`\`

### 4. Key Takeaways
1. **Defensive Rendering:** Implementing a 3-tier rendering logic—**[No Data / Data Found / Asset Missing]**—ensures a graceful fallback (Text UI) when remote images fail to load.
2. **State-Driven Styling:** Utilizing a centralized \`theme.ts\` for specific palettes (like the custom **Desaturated Grayish Lavender** for the navigation bar) allows for rapid UI experimentation and consistency.
3. **Architecture over Features:** Spending time on component abstraction early on reduced the time to build the "Receipt" share feature by 50% through reusable layout patterns.
    `,
  },
];

export default blogData;
