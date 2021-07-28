import gsap from "gsap";

export const fadeIn = (items) => gsap.fromTo(items, {
    opacity: 0,
    x: 'center'
}, {
    opacity: 1,
    position: 'absolute',
    x: 'center'
})

export const fadeOut = (items) => gsap.to(items, {
    opacity: 0

})

export const fromLeft = (items) => {
    return gsap.fromTo(items,
        {
            x: "-=110px",
            opacity: 0,
        },
        {
            duration: 0.5,
            ease: "linear",
            x: "center",
            position: "absolute",
            opacity: 1,
        }
    );
}
export const toLeft = (items) => {
    return gsap.fromTo(items,
        {
            y: 'center',
            x: "center",
            opacity: 1,
        },
        {
            x: "-=110px",
            opacity: 0,
            duration: 0.5,
            ease: "linear",
            position: "absolute",
        }
    );
}

export const toRight = (items) => {
    return gsap.fromTo(
        items,
        {
            x: "center",
            y: 'center',
            ease: "linear",
            opacity: 1,
        },
        {
            duration: 0.5,
            x: "+=130px",
            opacity: 0
        }
    )
}

export const fromRight = (items) => {
    return gsap.fromTo(
        items,
        {
            x: "+=130px", y: 'center',
            ease: "linear",
            opacity: 0
        },
        {
            opacity: 1,
            x: "center", y: 'center',
            duration: 0.5,
        }
    )
}

export const toTop = (items) => {
    return gsap.fromTo(items, {
        x: 'center', y: 'center',
        opacity: 1
    },
        {
            opacity: 0,
            y: '-=100px',
            x: 'center'
        })
}
export const fromTop = (items) => {
    return gsap.fromTo(items, {
        y: '-=100px',
        opacity: 0,
    },
        {
            x: 'center', y: 'center',
            opacity: 1
        })
}
export const toBottom = (items) => {
    return gsap.fromTo(items, {
        opacity: 1,
        x: 'center', y: 'center',
    },
        {
            y: '+=100px',
            opacity: 0,
        })
}
export const fromBottom = (items) => {
    return gsap.fromTo(items, {
        y: '+=100px',
        opacity: 0,
    },
        {
            x: 'center', y: 'center',
            opacity: 1,
        })

}