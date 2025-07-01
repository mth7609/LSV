import { saveDataset } from "./RendererScripts_02.js";

export async function runForeverConfirmDoSave(callCnt) {
    callCnt++;
    setTimeout(function () {
        if (localStorage.getItem("confirmSaveOverwrite") == 1) {
            console.log("Overwrite 2");
            saveDataset();
            localStorage.setItem("changeDatasetNumber", null);
            localStorage.setItem("datasetNumber", null);
            return;
        }
        runForeverConfirmDoSave(callCnt);
    }, 500);
};


