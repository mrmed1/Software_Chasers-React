
const jobTypes = [
    "Engineering",
    "Data Science",
    "Machine Learning",
    "Product Management",
    "Marketing",
    "Sales",
    "Customer Support",
    "Operations",
    "Finance",
    "Human Resources",
    "Design",

    "Mobile Development",
    "Game Development",
    "Other",
];
export const jobTypesList = jobTypes.map((type) => ({
    key: type,
    text: type,
    value: type,
}));

export const competenceList = [
    { key: "angular", text: "Angular", value: "angular" },
    { key: "css", text: "CSS", value: "css" },
    { key: "design", text: "Graphic Design", value: "design" },
    { key: "ember", text: "Ember", value: "ember" },
    { key: "html", text: "HTML", value: "html" },
    { key: "ia", text: "Information Architecture", value: "ia" },
    { key: "javascript", text: "Javascript", value: "javascript" },
    { key: "mech", text: "Mechanical Engineering", value: "mech" },
    { key: "meteor", text: "Meteor", value: "meteor" },
    { key: "node", text: "NodeJS", value: "node" },
    { key: "plumbing", text: "Plumbing", value: "plumbing" },
    { key: "python", text: "Python", value: "python" },
    { key: "rails", text: "Rails", value: "rails" },
    { key: "react", text: "React", value: "react" },
    { key: "repair", text: "Kitchen Repair", value: "repair" },
    { key: "ruby", text: "Ruby", value: "ruby" },
    { key: "ui", text: "UI Design", value: "ui" },
    { key: "ux", text: "User Experience", value: "ux" },

    { key: "vue", text: "Vue.js", value: "vue" },
    { key: "typescript", text: "TypeScript", value: "typescript" },
    { key: "docker", text: "Docker", value: "docker" },
    { key: "kubernetes", text: "Kubernetes", value: "kubernetes" },
    { key: "java", text: "Java", value: "java" },
    { key: "php", text: "PHP", value: "php" },
    { key: "swift", text: "Swift", value: "swift" },
    { key: "scala", text: "Scala", value: "scala" },
    { key: "hadoop", text: "Hadoop", value: "hadoop" },
    { key: "spark", text: "Apache Spark", value: "spark" },
    { key: "mongodb", text: "MongoDB", value: "mongodb" },
    { key: "mysql", text: "MySQL", value: "mysql" },
    { key: "postgresql", text: "PostgreSQL", value: "postgresql" },
    { key: "firebase", text: "Firebase", value: "firebase" },
    { key: "aws", text: "Amazon Web Services", value: "aws" },
    { key: "gcp", text: "Google Cloud Platform", value: "gcp" },
    { key: "azure", text: "Microsoft Azure", value: "azure" },
];
const clubs = ["J2I", "Microsoft Isamm", "IGA", "Orenda", "Radio", "IGC", "Android", "Tunivisions", "Robotic", "Enactus", "Photo"];

export const clubList = clubs.map((club) => ({
    key: club,
    text: club,
    value: club,
}));
