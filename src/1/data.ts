function generateDummyData() {
  const categories = [
    "문학",
    "경제경영",
    "자기계발",
    "경영혁신",
    "컴퓨터",
    "소설",
    "예술",
    "건강",
  ];
  const dummyDataArray = [];

  for (let i = 0; i < 50; i++) {
    const id = i + 1;
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const like = Math.floor(Math.random() * 100);

    const dummyData = {
      id: id,
      index: id,
      category: categories[categoryIndex],
      title: `${id}번째 신간 리스트`,
      createdTime: "2024-04-11",
      like: like,
    };

    dummyDataArray.push(dummyData);
  }

  return dummyDataArray;
}

export const reportListDummy = generateDummyData();
