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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            opacity: 0,
            scale: 1,
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
        opacity: 1,
        scale: 1,
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
        scale: 1,
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
        scale: 1,
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
        scale: 1,
    },
        {
            x: 'center', y: 'center',
            opacity: 1,
        })
}

export const explode = (items) => gsap.fromTo(items, {
    opacity: 1,
    scale: 1,
    x: 'center',
}, {
    scale: 5,
    opacity: 0,
    duration: 1,
    onComplete: function () {
        this.pause()
    }
})

export const implode = (items) => gsap.fromTo(items, {
    scale: 5,
    opacity: 0,
    duration: 1,
    x: 'center'
}, {
    opacity: 1,
    scale: 1,
    onComplete: function () {
        this.pause()
    }
})

export const count = (items) => {
    console.log(items, items.innerHTML)

    //if (typeof value === "number") {
    gsap.set(items, {
        position: 'absolute',
        x: 'center', y: 'center', opacity: 1
    })
    return gsap.to(items, {
        textContent: items.innerHTML,
        duration: 1,
        backgroundColor: 'red',
        ease: "linear",
        snap: { textContent: 1 },
        onUpdate: function () {
            items.inenerHTML = parseFloat(items.innerHTML)
            //   items.innerHTML = numberWithCommas(
            //     parseFloat(items.innerHTML)
            //   );
        },
    });
    //}
}

export const enter = (items, value, leaveValue) => {

    // gsap.to(items, {
    //     opacity: 1,
    //     x: 'center', y: 'center'
    // })
    if (items && value) {
        console.log('items', value, leaveValue)
        return gsap.fromTo(items, {
            textContent: leaveValue,
        }, {
            textContent: value,
            duration: 1,
            ease: "linear",
            snap: { textContent: 1 },
            // onStart: function () {
            //     items.innerHTML = 0
            // },
            // onUpdate: function () {
            //     items.innerHTML = items.innerHTML
            //     //   items.innerHTML = numberWithCommas(
            //     //     parseFloat(items.innerHTML)
            //     //   );
            // },
        })
    }
}
export const leave = (items) => {
    console.log('leave', items)
    return gsap.to(items, {
        opacity: 0,
        onComplete: () => {
            console.log(`left`, items)
        }
    })
}