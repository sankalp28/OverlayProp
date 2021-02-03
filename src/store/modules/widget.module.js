import { APIService } from "@/service/api.js";
import urlConstant from "@/constants/uri.constants.js";

const state = {
  updateWidgetResponse: {},
  getWidgetResponse: {},
  getSceneID: {},
  programOutput:{},
  deleteScene:{},
  notifyClientResponse:{},
};

const mutations = {
  notifyClient(state, payload) {
    switch (payload.type) {
      case "NOTIFYING_CLIENT":
        state.notifyClientResponse = {
          isNotifing: true,
          errorNotify: false,
        };
        break;
      case "NOTIFIED_CLIENT":
        state.notifyClientResponse = {
          isNotifing: false,
          errorNotify: false,
        };
        break;
      case "ERROR_NOTIFYING_CLIENT":
        state.notifyClientResponse = {
          isNotifing: false,
          errorNotify: true,
        };
        break;
    }
  },

  UpdateWidget(state, payload) {
    switch (payload.type) {
      case "UPDATING_WIDGET":
        state.updateWidgetResponse = {
          isDeletingTopic: true,
          errorDeletingTopic: false,
          responseData: {}
        };
        break;
      case "UPDATED_WIDGET":
        state.updateWidgetResponse = {
          isDeletingTopic: true,
          errorDeletingTopic: false,
          responseData: {}
        };
        break;
      case "ERROR_UPDATING_WIDGET":
        state.updateWidgetResponse = {
          isDeletingTopic: true,
          errorDeletingTopic: false,
          responseData: {}
        };
        break;
    }
  },


  fetchPreviewWidget(state, payload) {
    switch (payload.type) {
      case "FETCHING_PREVIEW_WIDGET":
        state.getWidgetResponse = {
          fetchingSuccess: false,
          widgetResponse: {}
        };
        break;
      case "FETCHED_PREVIEW_WIDGET":
        state.getWidgetResponse = {
          fetchingSuccess: true,
          widgetResponse: payload.data
        };
        break;
      case "ERROR_FETCHING_PREVIEW_WIDGET":
        state.getWidgetResponse = {
          fetchingSuccess: true,
          widgetResponse: false
        };
        break;
    }
  },

  updateOverlayCut(state, payload) {
    switch (payload.type) {
      case "UPDATING_PROGRAM":
        state.programOutput = {
          fetchingSuccess: false,
        };
        break;
      case "UPDATED_PROGRAM":
        state.programOutput = {
          fetchingSuccess: true,
        };
        break;
      case "ERROR_UPDATING_PROGRAM":
        state.programOutput = {
          fetchingSuccess: false,
        };
        break;
    }
  },

  deleteScene(state, payload) {
    switch (payload.type) {
      case "DELETING_SCENE":
        state.deleteScene = {
          deletingSuccess: false,
        };
        break;
      case "DELETED_SCENE":
        state.deleteScene = {
          deletingSuccess: true,
        };
        break;
      case "ERROR_DELETING_SCENE":
        state.deleteScene = {
          deletingSuccess: false,
        };
        break;
    }
  }

};

const actions = {
  actionUpdateWidget({ commit,dispatch }, _previewObj) {
    commit("UpdateWidget", { type: "UPDATING_WIDGET" });
    const { actionType } = {..._previewObj};
    delete _previewObj.actionType;
    APIService.post(urlConstant.baseUrl + urlConstant.previewWidget, _previewObj)
      .then(res => {
        if (res.data) {
          commit("UpdateWidget", { type: "UPDATED_WIDGET", data: res.data });
          if(actionType==='OVERLAY_CUT'){
            dispatch('actionNotifyClient', _previewObj.scene.sceneId);
          }
        }
      })
      .catch(err => {
        console.log("UpdateWidget", err);
        commit("UpdateWidget", { type: "ERROR_UPDATING_WIDGET"});
    });
  },
  
  actionGetPreviewWidget({ commit },_sceneId) {
    commit("fetchPreviewWidget", { type: "FETCHING_PREVIEW_WIDGET" });
    APIService.get(urlConstant.baseUrl + urlConstant.previewWidget+"/"+_sceneId)
      .then(res => {
        if (res.data) {
          commit("fetchPreviewWidget", {
            type: "FETCHED_PREVIEW_WIDGET",
            data:  res.data,
          });
        }
      })
      .catch(err => {
        console.log('errrrrrrrrrrrrrrr',err);
        commit("fetchPreviewWidget", { type: "ERROR_FETCHING_PREVIEW_WIDGET" });
      });
  },

  actionOverlayCut({ commit },_sceneId) {
    commit("updateOverlayCut", { type: "UPDATING_PROGRAM" });
    APIService.get(urlConstant.baseUrl + urlConstant.liveHtml+"/"+_sceneId)
      .then(res => {
        if (res.status===200) {
          commit("updateOverlayCut", {
            type: "UPDATED_PROGRAM",
          });
        }
      })
      .catch(err => {
        console.log(err);
        commit("updateOverlayCut", { type: "ERROR_UPDATING_PROGRAM" });
      });
  },

  actionDeleteScene({ commit }, _sceneId) {
    commit("deleteScene", { type: "DELETING_SCENE" });
    APIService.trash(
      urlConstant.baseUrl + urlConstant.previewWidget + "/" + _sceneId
    )
      .then(res => {
        if (res.data) {
          commit("deleteScene", { type: "DELETED_SCENE", data: res.data });
        }
      })
      .catch(err => {
        console.log(err);
        commit("deleteScene", { type: "ERROR_DELETING_SCENE" });
      });
  },

  actionNotifyClient({ commit }, _sceneId) {
    commit("notifyClient", { type: "NOTIFYING_CLIENT" });
    APIService.get(
      urlConstant.baseUrl + urlConstant.notifyClient + "/" + _sceneId
    )
      .then(res => {
        if (res.data) {
          commit("notifyClient", { type: "NOTIFIED_CLIENT", data: res.data });
        }
      })
      .catch(err => {
        console.log(err);
        commit("notifyClient", { type: "ERROR_NOTIFYING_CLIENT" });
      });
  },

  actionProducerGraphics({ commit }, programUrl) {
    const postObj={
      "programId":1212,
      "url":programUrl,
      "send2R":true
    };

    APIService.post(urlConstant.producerGraphics, postObj)
      .then(res => {
        if (res) {
          // commit("UpdateWidget", { type: "UPDATED_WIDGET", data: res.data });
        }
      })
      .catch(err => {
        console.log("UpdateWidget", err);
        commit("UpdateWidget", { type: "ERROR_UPDATING_WIDGET"});
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
