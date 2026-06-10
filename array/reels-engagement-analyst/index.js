const reelsContent = [
  { id: "R01", topic: "Keuangan", views: 1500, status: "viral" },
  { id: "R02", topic: "Productivity", views: 800, status: "normal" },
  { id: "R03", topic: "Keuangan", views: 2500, status: "viral" }, // <-- Keuangan lagi
  { id: "R04", topic: "Parenting", views: 1200, status: "normal" },
  { id: "R05", topic: "Productivity", views: 3000, status: "viral" } // <-- Productivity lagi
];

const topics = reelsContent.map(content => content.topic);
const uniqueTopics = topics.filter((topic,index) =>{
  return topics.indexOf(topic) === index;
})

const viewsByTopic = reelsContent.reduce((total, content) =>{
  const key = content.topic;  
  
  if (!total[key]){
    total[key] = 0;
  }

  total[key] += content.views

  return total

},{});

console.log('=== DAFTAR TOPIK KONTEN UNIK ===');
console.log(uniqueTopics);
console.log('\n=== TOTAL VIEWS PER TOPIK KONTEN ===');
console.log(viewsByTopic);