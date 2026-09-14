'use trict';

const curriculum = {
  "Mathematics": {
    "Algebra": {},
    "Calculus": {
      "Derivatives": {},
      "Integrals": {}
    }
  },
  "Physics": {
    "Thermodynamics": {
      "Heat Transfer": {
        "Convection": {},
        "Radiation": {}
      }
    }
  }
};

const shopping = {
  "Groceries": {
    "Produce": {
      "Apples": {},
      "Bananas": {}
    },
    "Dairy": {}
  }
};

const word = 'word';

function treeRendererIterative(data, container) {
  if (data === null || typeof data !== 'object') {
    const head = document.createElement('h2');
    head.textContent = data;
    container.append(head);
    return;
  }

  // Gunakan Stack untuk menyimpan tugas yang perlu diproses
  // Format: { nodeData, parentElement }
  const stack = [{ nodeData: data, parentElement: container }];

  while (stack.length > 0) {
    const { nodeData, parentElement } = stack.pop();
    const list = document.createElement('ul');

    for (const key in nodeData) {
      if (!Object.prototype.hasOwnProperty.call(nodeData, key)) continue;

      const listItem = document.createElement('li');
      const value = nodeData[key];

      if (typeof value === 'object' && value !== null) {
        listItem.textContent = key;
        // Masukkan elemen anak ke stack untuk diproses pada perulangan berikutnya
        stack.push({ nodeData: value, parentElement: listItem });
      } else {
        listItem.textContent = `${key}: ${value}`;
      }

      list.append(listItem);
    }

    parentElement.append(list);
  }
}

const container = document.getElementById('root');
treeRendererIterative(shopping, container);