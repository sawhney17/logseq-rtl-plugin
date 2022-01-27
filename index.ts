import '@logseq/libs';

const main = async () => {
  console.log("hi")
  const callback = async function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.removedNodes.length > 0 && mutation.removedNodes[0].className === 'editor-inner block-editor') {
          const uuid = mutation.target.closest('div[id^="ls-block"]')?.getAttribute('blockid');
          const currentBlock = await logseq.App.getBlock(uuid)
          if (currentBlock.content.match(/[اأإء-ي]/ui)){
            logseq.provideStyle(`.ls-block[blockid = "${uuid}"]{direction: rtl;}`)
        } else {
          logseq.provideStyle(`.ls-block[blockid = "${uuid}"]{direction: ltr;}`)
        }
          // logseq.App.showMsg(`[:div [:div "Exit editing mode for uuid: ${uuid}"] [:div "Content"] [:div "${currentBlock.content}"]]`)
    }
  }
};
const observer = new top.MutationObserver(callback);
observer.observe(top.document.getElementById('main-content-container'), { attributes: false, childList: true, subtree: true });
}
logseq.ready(main).catch(console.error);
