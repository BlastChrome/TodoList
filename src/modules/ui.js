import Background from "./background";



const start = () => {
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(Background());

}
const UI = (() => {
    start()

})();


export default UI;




