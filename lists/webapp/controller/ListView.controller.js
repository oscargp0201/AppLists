sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.lists.controller.ListView", {
            onInit: function () {
                let oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("../localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);
            },
            onShowSelectedRows: function () {
                let standardList = this.getView().byId("_IDGenList2");
                let selectedItems = standardList.getSelectedItems();
                let i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    let textMessage = i18nModel.getText("Selection");
                    for (let item in selectedItems) {
                        let context = selectedItems[item].getBindingContext();
                        let oContext = context.getObject();
                        textMessage = textMessage + " - " + oContext.Material;
                    }
                    sap.m.MessageToast.show(textMessage);

                }
            },
            onDeleteSelectedRows: function () {
                let standardList = this.getView().byId("_IDGenList2");
                let selectedItems = standardList.getSelectedItems();
                let i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    let textMessage = i18nModel.getText("Selection");
                    let model = this.getView().getModel();
                    let products = model.getProperty("/Products");
                    let arrayId = [];

                    for (let i in selectedItems) {
                        let context = selectedItems[i].getBindingContext();
                        let oContext = context.getObject();
                        arrayId.push(oContext.Id);
                        textMessage = textMessage + " - " + oContext.Material;
                    }

                    products = products.filter(function(p) {
                        return !arrayId.includes(p.Id);
                    });

                    model.setProperty("/Products", products);
                    standardList.removeSelections();
                    sap.m.MessageToast.show(textMessage);

                }
            },

            onDeleteRow: function(oEvent) {
                var selectedRow = oEvent.getParameter("listItem");
                var context = selectedRow.getBindingContext();
                var splitPath = context.getPath().split("/");
                var indexSelectedRow = splitPath[splitPath.length-1];
                var model = this.getView().getModel();
                var products = model.getProperty("/Products");
                products.splice(indexSelectedRow,1);
                model.refresh();
            }

        });
    });
