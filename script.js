// 侧边菜单控制
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');
const menuLinks = document.querySelectorAll('.menu-list a');

// 打开菜单
menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('active');
});

// 关闭菜单
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
});

// 点击菜单项后关闭菜单
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        sideMenu.classList.remove('active');
    });
});

// 点击菜单外部关闭
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        sideMenu.classList.remove('active');
    }
});

// 返回顶部按钮
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});

topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 表单提交处理
const enrollmentForm = document.getElementById('enrollmentForm');

enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(enrollmentForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // 验证手机号
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('请输入正确的手机号码');
        return;
    }
    
    // 这里应该发送到后端服务器
    console.log('报名信息：', data);
    
    // 模拟提交成功
    alert('报名信息提交成功！\n\n我们的招生老师会在24小时内与您联系。\n感谢您选择三河市光大实验学校！');
    
    // 重置表单
    enrollmentForm.reset();
    
    // 实际项目中，这里应该使用 fetch 或 axios 发送数据到服务器
    /*
    fetch('/api/enrollment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('报名成功！我们会尽快与您联系。');
        enrollmentForm.reset();
    })
    .catch(error => {
        alert('提交失败，请稍后重试或直接拨打招生热线。');
        console.error('Error:', error);
    });
    */
});

// 滚动动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有卡片元素
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.advantage-card, .department-card, .campus-card, .university-card, .info-card, .contact-card, .feature-block, .feature-point, .teaching-step, .gallery-item');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// 数字滚动动画
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// 当统计数字进入视口时触发动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const number = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(number.textContent);
            animateNumber(number, targetValue);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // 向下滚动
        header.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// 电话拨打确认（可选）
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // 在某些情况下可能需要确认
        // e.preventDefault();
        // if (confirm('确定要拨打招生热线吗？')) {
        //     window.location.href = link.href;
        // }
    });
});

// 防止表单重复提交
let isSubmitting = false;
enrollmentForm.addEventListener('submit', (e) => {
    if (isSubmitting) {
        e.preventDefault();
        return;
    }
    isSubmitting = true;
    setTimeout(() => {
        isSubmitting = false;
    }, 3000);
});

// 输入验证提示
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
            phoneInput.style.borderColor = '#e74c3c';
        } else {
            phoneInput.style.borderColor = '#ddd';
        }
    });
}

// 添加触摸滑动关闭菜单功能（移动端优化）
let touchStartX = 0;
let touchEndX = 0;

sideMenu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

sideMenu.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX > touchStartX + 50) {
        // 向右滑动，关闭菜单
        sideMenu.classList.remove('active');
    }
}

// 图片懒加载（如果有图片的话）
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 移动端优化
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // 移动端特殊处理
    document.body.classList.add('mobile-device');
    
    // 修复移动端100vh问题
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });
    
    // 优化触摸滚动
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
    
    // 移动端图片画廊优化
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.add('touched');
        });
        
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touched');
            }, 300);
        });
    });
    
    // 移动端按钮优化
    const buttons = document.querySelectorAll('.cta-btn, .contact-link, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// 移动端菜单优化
if (window.innerWidth <= 767) {
    // 点击菜单项后自动关闭菜单
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                sideMenu.classList.remove('active');
            }, 100);
        });
    });
    
    // 移动端滚动优化
    let ticking = false;
    function updateScrollPosition() {
        // 移动端滚动性能优化
        if (!ticking) {
            requestAnimationFrame(() => {
                // 滚动相关的处理
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateScrollPosition, {passive: true});
}

// 移动端表单优化
if (isMobile && enrollmentForm) {
    const inputs = enrollmentForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // 移动端输入框获得焦点时滚动到视图中
        input.addEventListener('focus', function() {
            setTimeout(() => {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        });
    });
}

// 移动端图片懒加载优化
if ('IntersectionObserver' in window && isMobile) {
    const mobileImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    mobileImageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        mobileImageObserver.observe(img);
    });
}

// 移动端性能优化
if (isMobile) {
    // 减少动画复杂度
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
            
            .hero-section::before {
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}
// 强制满屏显示
function forceFullScreen() {
    const heroSection = document.querySelector('.hero-section');
    const heroSlider = document.querySelector('.hero-slider');
    const heroSlide = document.querySelector('.hero-slide');
    
    if (heroSection) {
        heroSection.style.setProperty('width', '100vw', 'important');
        heroSection.style.setProperty('height', '100vh', 'important');
        heroSection.style.setProperty('left', '50%', 'important');
        heroSection.style.setProperty('margin-left', '-50vw', 'important');
        heroSection.style.setProperty('position', 'relative', 'important');
        heroSection.style.setProperty('overflow', 'hidden', 'important');
        heroSection.style.setProperty('max-width', 'none', 'important');
    }
    
    if (heroSlider) {
        heroSlider.style.setProperty('width', '100vw', 'important');
        heroSlider.style.setProperty('height', '100vh', 'important');
        heroSlider.style.setProperty('position', 'relative', 'important');
    }
    
    if (heroSlide) {
        heroSlide.style.setProperty('width', '100vw', 'important');
        heroSlide.style.setProperty('height', '100vh', 'important');
        heroSlide.style.setProperty('background-size', 'cover', 'important');
        heroSlide.style.setProperty('background-position', 'center', 'important');
        heroSlide.style.setProperty('position', 'relative', 'important');
    }
    
    console.log('强制满屏样式已应用');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', forceFullScreen);

// 立即执行一次
forceFullScreen();

// 窗口大小改变时重新执行
window.addEventListener('resize', forceFullScreen);

// 额外的强制执行
setTimeout(forceFullScreen, 100);
setTimeout(forceFullScreen, 500);
setTimeout(forceFullScreen, 1000);

console.log('满屏显示JavaScript已加载');
// 移动端专用优化
function mobileOptimization() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 添加移动端标识
        document.body.classList.add('mobile-device');
        
        // 修复移动端视口问题
        function setMobileViewport() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            // 强制设置hero section高度
            const heroSection = document.querySelector('.hero-section');
            const heroSlide = document.querySelector('.hero-slide');
            
            if (heroSection) {
                heroSection.style.height = window.innerHeight + 'px';
            }
            if (heroSlide) {
                heroSlide.style.height = window.innerHeight + 'px';
            }
        }
        
        setMobileViewport();
        window.addEventListener('resize', setMobileViewport);
        window.addEventListener('orientationchange', () => {
            setTimeout(setMobileViewport, 100);
        });
        
        // 移动端触摸优化
        document.addEventListener('touchstart', function() {}, {passive: true});
        document.addEventListener('touchmove', function() {}, {passive: true});
        
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // 移动端菜单优化
        const menuLinks = document.querySelectorAll('.menu-list a');
        menuLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.backgroundColor = '#f0f0f0';
            });
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 150);
            });
        });
        
        // 移动端按钮触摸反馈
        const buttons = document.querySelectorAll('.cta-btn, .contact-link, .submit-btn, .float-btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.8';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.opacity = '';
            });
        });
        
        // 移动端表单优化
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // 滚动到输入框
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            });
        });
        
        // 移动端图片懒加载
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // 移动端性能优化
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 767px) {
                * {
                    animation-duration: 0.2s !important;
                    transition-duration: 0.2s !important;
                }
                
                .hero-section::before {
                    animation: none !important;
                }
                
                .gallery-item:hover img {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        console.log('移动端优化已启用');
    }
}

// 页面加载完成后执行移动端优化
document.addEventListener('DOMContentLoaded', mobileOptimization);

// 移动端滚动性能优化
if (window.innerWidth <= 767) {
    let ticking = false;
    
    function updateScrollPosition() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // 移动端滚动处理
                const scrollTop = window.pageYOffset;
                const header = document.querySelector('.header');
                
                if (scrollTop > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateScrollPosition, {passive: true});
}

console.log('移动端适配JavaScript已加载完成');
// 终极满屏解决方案
function ultimateFullScreen() {
    // 创建强制样式
    const style = document.createElement('style');
    style.id = 'force-fullscreen';
    style.innerHTML = `
        #home.hero-section,
        .hero-section,
        section.hero-section {
            width: 100vw !important;
            height: 100vh !important;
            position: relative !important;
            left: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            right: 50% !important;
            overflow: hidden !important;
            max-width: none !important;
            min-width: 100vw !important;
        }
        
        .hero-slider,
        .hero-slide,
        .hero-slide.active {
            width: 100vw !important;
            height: 100vh !important;
            position: relative !important;
            overflow: hidden !important;
            max-width: none !important;
            min-width: 100vw !important;
        }
        
        .main-content {
            width: 100% !important;
            overflow-x: hidden !important;
        }
        
        body, html {
            overflow-x: hidden !important;
            width: 100% !important;
        }
    `;
    
    // 移除旧的样式（如果存在）
    const oldStyle = document.getElementById('force-fullscreen');
    if (oldStyle) {
        oldStyle.remove();
    }
    
    // 添加新样式到head
    document.head.appendChild(style);
    
    // 直接设置元素样式
    const elements = [
        document.querySelector('#home.hero-section'),
        document.querySelector('.hero-section'),
        document.querySelector('section.hero-section'),
        document.querySelector('.hero-slider'),
        document.querySelector('.hero-slide'),
        document.querySelector('.hero-slide.active')
    ];
    
    elements.forEach(element => {
        if (element) {
            element.style.setProperty('width', '100vw', 'important');
            element.style.setProperty('height', '100vh', 'important');
            element.style.setProperty('position', 'relative', 'important');
            element.style.setProperty('left', '50%', 'important');
            element.style.setProperty('margin-left', '-50vw', 'important');
            element.style.setProperty('margin-right', '-50vw', 'important');
            element.style.setProperty('right', '50%', 'important');
            element.style.setProperty('overflow', 'hidden', 'important');
            element.style.setProperty('max-width', 'none', 'important');
            element.style.setProperty('min-width', '100vw', 'important');
        }
    });
    
    console.log('终极满屏解决方案已应用');
}

// 立即执行
ultimateFullScreen();

// 页面加载后执行
document.addEventListener('DOMContentLoaded', ultimateFullScreen);

// 延迟执行多次确保生效
setTimeout(ultimateFullScreen, 50);
setTimeout(ultimateFullScreen, 200);
setTimeout(ultimateFullScreen, 500);
setTimeout(ultimateFullScreen, 1000);
setTimeout(ultimateFullScreen, 2000);

// 窗口大小改变时执行
window.addEventListener('resize', ultimateFullScreen);
window.addEventListener('orientationchange', () => {
    setTimeout(ultimateFullScreen, 100);
});

console.log('终极满屏JavaScript已加载');