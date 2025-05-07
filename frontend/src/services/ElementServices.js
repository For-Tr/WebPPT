const ElementService = {
    createElement: (type, data) => {
      return {
        id: Date.now().toString(),
        type,
        position: { x: 10, y: 10 },  // Default position
        size: {
          width: Number(data.width),
          height: Number(data.height)
        },
        ...data
      };
    }
  };
  
  export default ElementService;