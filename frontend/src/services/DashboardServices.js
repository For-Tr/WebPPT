import requests from "./httpService";

const StoreServices = {
  // 获取整个 store 数据
  getStore: async () => {
    return requests.get("/store");
  },

  // 更新整个 store 数据
  updateStore: async (data) => {
    return requests.put("/store", data);
  },

  // 便捷方法：获取所有演示文稿
  getPresentations: async () => {
    const response = await requests.get("/store");
    console.log(response)
    return response.store.presentations || [];
  },

  // 便捷方法：添加新演示文稿
  addPresentation: async (newPresentation) => {
    const response = await requests.get("/store");
    const store = response.store;
    const presentations = [...(store.presentations || []), newPresentation];
    
    return requests.put("/store", {
      store: {
        ...store,
        presentations
      }
    });
  },

 // 便捷方法：获取演示文稿
 getPresentation: async (presentationId) => {
  const response = await requests.get("/store");
  const store = response.store;
  const presentation = (store.presentations || []).find(
    presentation => presentation.id === presentationId
  );
  
  return presentation || null;
},




  // 便捷方法：更新演示文稿
  updatePresentation: async (presentationId, updatedData) => {
    const response = await requests.get("/store");
    const store = response.store;
    const presentations = (store.presentations || []).map(presentation => 
      presentation.id === presentationId 
        ? { ...presentation, ...updatedData }
        : presentation
    );

    return requests.put("/store", {
      store: {
        ...store,
        presentations
      }
    });
  },

  // 便捷方法：删除演示文稿
  deletePresentation: async (presentationId) => {
    const response = await requests.get("/store");
    const store = response.store;
    const presentations = (store.presentations || []).filter(
      presentation => presentation.id !== presentationId
    );

    return requests.put("/store", {
      store: {
        ...store,
        presentations
      }
    });
  },

  // 便捷方法：更新幻灯片
  updateSlide: async (presentationId, slideId, slideData) => {
    const response = await requests.get("/store");
    const store = response.store;
    const presentations = (store.presentations || []).map(presentation => {
      if (presentation.id === presentationId) {
        const slides = presentation.slides.map(slide =>
          slide.id === slideId ? { ...slide, ...slideData } : slide
        );
        return { ...presentation, slides };
      }
      return presentation;
    });

    return requests.put("/store", {
      store: {
        ...store,
        presentations
      }
    });
  },

  // 便捷方法：添加幻灯片
  addSlide: async (presentationId, newSlide) => {
    const response = await requests.get("/store");
    const store = response.store;
    const presentations = (store.presentations || []).map(presentation => {
      if (presentation.id === presentationId) {
        return {
          ...presentation,
          slides: [...presentation.slides, newSlide]
        };
      }
      return presentation;
    });

    return requests.put("/store", {
      store: {
        ...store,
        presentations
      }
    });
  },

  // 便捷方法：删除幻灯片
  deleteSlide: async (presentationId, slideId) => {
    const response = await requests.get("/store");
    const store = response.store;
    const presentations = (store.presentations || []).map(presentation => {
      if (presentation.id === presentationId) {
        return {
          ...presentation,
          slides: presentation.slides.filter(slide => slide.id !== slideId)
        };
      }
      return presentation;
    });

    return requests.put("/store", {
      store: {
        ...store,
        presentations
      }
    });
  }
};

export default StoreServices;