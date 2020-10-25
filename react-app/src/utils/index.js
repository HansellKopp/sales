export const hasPermission = () => { return true }

export const formatNumber = (num) => {
    if(isNaN(num)) num = 0
    const value = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return value
}
