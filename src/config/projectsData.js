// src/config/projectsData.js
import project1 from "../assets/project_hyang.jpg";
import project2 from "../assets/project_wedding.jpg";

const projectsData = [
  {
    title: "Hyang(Fragrance Tracker)",
    period: "2026.01 - Present",
    description:
      "An intuitive scent-diary app for perfume enthusiasts to manage their collection and record daily fragrance experiences.",
    tags: ["React Native", "TypeScript", "Supabase", "Python"],
    image: project1,
    github: "https://github.com/repoleved33/hyang",
    demo: "",
  },
  {
    title: "Wedding Invitation",
    period: "2022.01 - 2022.02",
    description:
      "A custom-built, responsive mobile wedding invitation developed with React to provide a seamless experience.",
    tags: ["React", "gitio"],
    image: project2,
    github: "https://github.com/ghbkWedding/ghbkWedding.github.io",
    demo: "https://ghbkwedding.github.io",
  },
];

export default projectsData;
