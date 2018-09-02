function count() {
    let num = 0;
    return function () {
        num++;
        return num;
    }
}
var index = count();
export default index;