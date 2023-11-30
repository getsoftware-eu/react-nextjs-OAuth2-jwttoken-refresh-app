// help function to adjust size of hidden textareas
function onShowTextareaParent(event) {
    const textareaParentEl = event.target;
    // console.log(textareaParentEl);
    let textareas = textareaParentEl.querySelectorAll('textarea');
    for (let i = 0; i < textareas.length; i++) {
        autosize.update(textareas[i]);
    }
}
