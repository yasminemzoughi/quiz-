export const myData = [
  {
    question: {
      questionText: "Match the fruit with its proper color",
      id: "fruit",
      options: [
        { id: "fruit1", text: "banana", connectedColor: "color2" },
        { id: "fruit2", text: "apple", connectedColor: "color3" },
        { id: "fruit3", text: "berries", connectedColor: "color1" },
      ],
    },
    color: {
      id: "color",
      options: [
        { id: "color1", text: "red", isAvailable: true },
        { id: "color2", text: "yellow", isAvailable: true },
        { id: "color3", text: "green", isAvailable: true }  ,
      ],
    },
  },
  {
    question: {
      questionText: "Match the shape with its proper object",
      id: "shape",
      options: [
        { id: "shape1", text: "circle", connectedColor: "object2" },
        { id: "shape2", text: "square", connectedColor: "object3" },
        { id: "shape3", text: "triangle", connectedColor: "object1" },
      ],
    },
    color: {
      id: "object",
      options: [
        { id: "object1", text: "pyramid", isAvailable: true },
        { id: "object2", text: "wheel", isAvailable: true },
        { id: "object3", text: "dice", isAvailable: true },
      ],
    },
  },
  {
    question: {
      questionText: "Match the animal with its proper sound",
      id: "animal",
      options: [
        { id: "animal1", text: "lion", connectedColor: "sound3" },
        { id: "animal2", text: "cat", connectedColor: "sound1" },
        { id: "animal3", text: "dog", connectedColor: "sound2" },
      ],
    },
    color: {
      id: "sound",
      options: [
        { id: "sound1", text: "meow", isAvailable: true },
        { id: "sound2", text: "bark", isAvailable: true },
        { id: "sound3", text: "roar", isAvailable: true },
      ],
    },
  },
];
