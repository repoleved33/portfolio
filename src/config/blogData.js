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
];

export default blogData;
