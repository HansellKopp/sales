export const hasPermission = () => { return true }

export const formatNumber = (num) => {
    if(isNaN(num)) return num
    const value = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return value
}
