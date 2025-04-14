// Zodiacal symbols
function createSign(name, codePoint, index) {
    return {
        name: name,
        codePoint: codePoint,
        index: index
    };
}

export const Aries = createSign("Aries", "\u2648", 0)
export const Taurus = createSign("Taurus", "\u2649", 1)
export const Gemini = createSign("Gemini", "\u264A", 2)
export const Cancer = createSign("Cancer", "\u264B", 3)
export const Leo = createSign("Leo", "\u264C", 4)
export const Virgo = createSign("Virgo", "\u264D", 5)
export const Libra = createSign("Libra", "\u264E", 6)
export const Scorpio = createSign("Scorpio", "\u264F", 7)
export const Sagittarius = createSign("Sagittarius", "\u2650", 8)
export const Capricorn = createSign("Capricorn", "\u2651", 9)
export const Aquarius = createSign("Aquarius", "\u2652", 10)
export const Pisces = createSign("Pisces", "\u2653", 11)