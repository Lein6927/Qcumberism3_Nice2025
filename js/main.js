//色彩基礎設定:
const themes = {
  a: {
    // "--main-color": "#FF6B57",
    // "--accent-color": "#FFA94D",
    // "--hover-color": "#FFF5E1",
    "--main-color": "#FF9C41",
    "--accent-color": "#ffe2b0",
    "--hover-color": "#FFF5E1",
  },
  b: {
    // "--main-color": "#D6C5F0",
    // "--accent-color": "#A8D5BA",
    // "--hover-color": "#BCA4EA",

    "--main-color": "#d2e89e",
    "--accent-color": "#E7F8D2",
    "--hover-color": "#F6FBEA",
  },
  c: {
    // "--main-color": "#85C7F2",
    // "--accent-color": "#B1A7F2",
    // "--hover-color": "#EAF7FF",
    "--main-color": "#cfebfc",
    "--accent-color": "#85C7F2",
    "--hover-color": "#EAF7FF",
  },
  default: {
    "--main-color": "#CDE3DB",
    "--accent-color": "#E8F3F1",
    "--hover-color": "#F9FAF4",
  },
};

let allCardData = []; // 存所有商品資料
//讀取json
fetch("json/card_data.json")
  .then((response) => {
    if (!response.ok) throw new Error("載入失敗！");
    return response.json();
  })
  .then((data) => {
    allCardData = data;
    renderCards(data);
  })
  .catch((err) => console.error(err));
//=====================================================
//1140725_因未使用flitCard(member)只使用authorTheme(member)故拿掉
// function setTheme(member) {
//   //1140717_抓取function authorTheme-選擇哪個成員
//   //function flitCard-根據選擇顯示該成員的資料
//   authorTheme(member);
//   // flitCard(member);
//   //   const root = document.documentElement;
//   //   //抓html根節點，設定 CSS 變數
//   //   const selected = member ? themes[member] : themes.default;
//   //   //根據member來抓對應顏色，沒抓到就讀預設
//   //   for (let key in selected) {
//   //     root.style.setProperty(key, selected[key]);
//   //   }
//   //   document.querySelectorAll(".card").forEach((card) => {
//   //     card.style.display =
//   //       !member || card.classList.contains(member) ? "flex" : "none";
//   //     //根據選擇誰決定是否顯示
//   //   });
// }
//=====================================================
//1140717_根據json檔中的資料"author"來做改動
function authorTheme(member) {
  const themesMap = {
    a: themes.a,
    b: themes.b,
    c: themes.c,
    all: themes.default,
  }; //對應到上面寫好的Css配色
  const selectedTheme = themesMap[member] || themesMap.all;
  //抓html根節點，設定 CSS 變數
  const root = document.documentElement;
  for (let key in selectedTheme) {
    root.style.setProperty(key, selectedTheme[key]);
  }

  // 過濾資料
  const filtered =
    member === "all" || !member
      ? allCardData
      : allCardData.filter(
          (item) => item.author.toLowerCase() === member.toLowerCase()
        );
  renderCards(filtered);
  //過濾商品資料，預設是all
  //.toLowerCase()轉換大小寫，全部轉換小寫
}
/*
function flitCard(cards) {
  // const cards = document.querySelectorAll(".card");
  const container = document.getElementById("productContainer");
  container.innerHTML = ""; // 清空舊卡片

  cards.forEach((item) => {
    const show = !member || card.classList.contains(member);
    card.style.display = show ? "flex" : "none";
  });
}
*/
function renderCards(cards) {
  //cards 陣列物件
  const container = document.getElementById("productContainer");
  container.innerHTML = ""; // 清空舊卡片

  cards.forEach((item) => {
    const card = document.createElement("div");
    card.className = `card ${item.author.toLowerCase()}`;

    card.innerHTML = `
    <h3>${item.title}</h3>
      <img src="${item.image}" alt="${item.title}" width="100%" />   
      <p>NT$ ${item.price}</p>
      <button>購買</button>
    `;

    container.appendChild(card);
  });
  console.log("card" + cards);
}

//=====================================================
const productGrid = document.getElementById("productContainer");
//改變版面:單欄、雙欄、三欄

function setModel(model) {
  productGrid.classList.remove("model-1", "model-2", "model-3");
  productGrid.classList.add(model);
}

document.getElementById("view-model-model1").addEventListener("click", () => {
  setModel("model-1");
});

document.getElementById("view-model-model2").addEventListener("click", () => {
  setModel("model-2");
});

document.getElementById("view-model-model3").addEventListener("click", () => {
  setModel("model-3");
});

//========================================================
//1140717_選擇成員的按鈕
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".icon-button").forEach((button) => {
    button.addEventListener("click", () => {
      const member = button.dataset.member;
      authorTheme(member);
    });
  });
});

//==========================
