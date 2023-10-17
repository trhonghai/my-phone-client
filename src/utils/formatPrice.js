function formatPrice(number) {
    return (
        new Intl.NumberFormat('vi-VN', {
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(number) + 'đ'
    )
}

export default formatPrice
