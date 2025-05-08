const ElementService = {
    createElement: (type, data) => {
    return {
        ...data,
        id: Date.now().toString(),
        type,
        position: { x: 10, y: 10 },  // Default position
        size: {
          width: Number(data.width),
          height: data.height
        }
      };
    }
  };
  
  export default ElementService;