// Unified DOMContentLoaded handler for all functionality
document.addEventListener('DOMContentLoaded', () => {
    /* CATEGORY IMAGE HORIZONTAL SLIDER */
    (function initCategorySlider() {
        const prevBtn = document.querySelector('.arrow-btnleft');
        const nextBtn = document.querySelector('.arrow-btnright');
        const track = document.querySelector('.slider-track');
        const slides = document.querySelectorAll('.slider-img');
        const container = document.querySelector('.category-container');
        if (!prevBtn || !nextBtn || !track || slides.length === 0 || !container) return; // guard

        const gap = 40; // matches CSS flex gap set to 40px
        let slideWidth = slides[0].offsetWidth + gap;
        let currentPosition = 0;

        function recalcWidth() {
            slideWidth = slides[0].offsetWidth + gap;
            moveSlide(0, true);
        }

        function moveSlide(direction, force = false) {
            if (!force) {
                if (direction === 'next') currentPosition++; else if (direction === 'prev') currentPosition--;
            }
            const visibleSlides = Math.max(1, Math.floor(container.offsetWidth / slideWidth));
            const maxPosition = Math.max(0, slides.length - visibleSlides);
            if (currentPosition > maxPosition) currentPosition = 0;
            if (currentPosition < 0) currentPosition = maxPosition;
            track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
        }

        nextBtn.addEventListener('click', () => moveSlide('next'));
        prevBtn.addEventListener('click', () => moveSlide('prev'));
        window.addEventListener('resize', recalcWidth);
        setInterval(() => moveSlide('next'), 5000); // 5s auto slide
    })();

    /* BANNER / OFFER SLIDER */
    (function initBannerSlider() {
        const slides = document.querySelectorAll('.banner');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotContainer = document.querySelector('.dots');
        if (slides.length === 0 || !prevBtn || !nextBtn || !dotContainer) return;
        let currentIndex = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            dotContainer.appendChild(dot);
        });

        const dots = dotContainer.querySelectorAll('.dot');

        function showSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }

        nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
        prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
        setInterval(() => showSlide(currentIndex + 1), 4000); // rotate every 4s
    })();

    /* SEARCH FUNCTIONALITY */
    (function initSearch() {
        const input = document.getElementById('search');
        if (!input) {
            console.warn('home.js: #search input not found');
            return;
        }
        const items = Array.from(document.querySelectorAll('.search-item'));
        const count = document.querySelector('#search-count'); 
        if (items.length === 0) {
            console.warn("home.js: No .search-item elements found.");
        }
        const normalize = str => (str || '').toString().toLowerCase();
        const getItemText = el => el.getAttribute('data-search-text') || el.textContent || '';

        function filter(term) {
            const q = normalize(term.trim());
            let visible = 0;
            items.forEach(el => {
                const text = normalize(getItemText(el));
                const match = !q || text.includes(q);
                el.style.display = match ? '' : 'none';
                if (match) visible++;
            });
            if (count) count.textContent = visible + (visible === 1 ? ' result' : ' results');
        }

        // Debounce for performance on large lists
        let t;
        input.addEventListener('input', () => {
            clearTimeout(t);
            t = setTimeout(() => filter(input.value), 120);
        });
        // filter(input.value || '');
    })();
});

let cartCount = document.getElementById('cart-count')
let savedOld = JSON.parse(localStorage.getItem('cartItems')) 
let saved = savedOld ? savedOld : []
let quantity = saved.reduce((sum,item) => sum + item.quantity,0 ) 

cartCount.textContent = (quantity)
console.log(quantity)
document.addEventListener('DOMContentLoaded', () => {
const locName = document.getElementById('locat-space')
const pinInput = document.getElementById('pin')
const pinBtn = document.getElementById('pin-btn')

const locations = {
  193101: "Laridora B.O",
  193109: "Kalantra B.O",
  193223: "WAVOORA B.O",
  193201: "M.E.T B.O",
  193502: "Gamroo B.O",
  193303: "Chatoosa B.O",
  193503: "Gujran B.O",
  193221: "Kandi Khaas B.O",
  193108: "Wanigam B.O",
  193222: "Gulgam B.O",
  193302: "Shatgund B.O",
  193122: "Lachipora B.O",
  193121: "Gund Ibrahim B.O",
  193301: "Nadihal B.O",
  193504: "Asham B.O",
  193501: "Batvina B.O",
  193225: "Nowgabra B.O",
  193224: "Kachhama B.O",
  193123: "Balkote B.O",
  181133: "Tarore BO",
  181132: "Chak Umrah BO",
  181102: "Chakrohi BO",
  181141: "Abtal BO",
  180011: "Sunjwan BO",
  184121: "JNV Nud BO",
  184120: "Sanjwan BO",
  181201: "Bala BO",
  181122: "Baran BO",
  185154: "Ghar Majoor BO",
  181206: "Nagbani BO",
  181202: "Datial BO",
  181221: "JKotli BO",
  181203: "Danwal BO",
  180017: "Bain Bajalta BO",
  181207: "Gura Manhasan BO",
  180002: "Govind Nagar BO",
  184206: "Fatehpur BO",
  184143: "Budhi BO",
  184201: "Banjal BO",
  184203: "Barotta BO",
  184204: "Marhoon BO",
  184144: "Dhamal BO",
  184141: "Said BO",
  184142: "Gurah Mundian BO",
  184152: "Karroh BO",
  184202: "Banhore BO",
  184104: "Janglote BO",
  184151: "Khokhial BO",
  184205: "Galak BO",
  184148: "Babia BO",
  185131: "Tandwal BO",
  185155: "Sehar BO",
  185233: "Samote BO",
  185135: "Chowkian BO",
  185211: "Chuggan BO",
  185132: "Badhoon BO",
  185234: "Kotdhara BO",
  185202: "Darkeri BO",
  185156: "Bharore BO",
  185152: "Bagnoti BO",
  185102: "Chella Dhangri BO",
  185151: "Bagla BO",
  185101: "Ajote BO",
  185121: "Bafliaz BO",
  185201: "Dharamsal BO",
  185212: "Dodasanbala BO",
  192201: "Bulbul Nowgam BO",
  192305: "Sugan BO",
  192122: "Barsoo BO",
  192124: "Krandigam BO",
  192233: "Khuri Batpora B  BO",
  192302: "Balpora BO",
  193306: "Drabgam BO",
  192202: "Muti Handoo BO",
  192231: "Chadder BO",
  192125: "Nambal BO",
  192301: "Murram BO",
  192221: "Vesshu BO",
  192129: "Khayar BO",
  192303: "Ramnagri BO",
  192401: "Dhawtoo BO",
  192123: "Satura BO",
  192212: "Sadinare BO",
  192232: "Mgufan BO",
  193411: "Iskanderpora BO",
  191111: "Bandgam BO",
  191113: "Bogam Batapora BO",
  191112: "Keller Mastpora BO",
  191201: "Daderhama BO",
  191202: "Gund BO",
  190006: "Basurbagh BO",
  193401: "S K Pora BO",
  192121: "Khanda BO",
  191101: "Pandrathan BO",
  190003: "Nandpora BO",
  193402: "Babareshi BO",
  191131: "Sehpora BO",
  193404: "Devpora Dardpora BO",
  182101: "PTS Udhampur BO",
  182313: "Jij BO",
  182146: "Neel BO",
  182143: "Tringla BO",
  182148: "Halla BO",
  182141: "Basahat BO",
  182202: "Dessa BO",
  182129: "Bhart BO",
  182121: "Hartriyan BO",
  182124: "Hartrian BO",
  182147: "Dhandal BO",
  182301: "Adhkawari BO",
  182201: "Dhara BO",
  182204: "Badhat BO",
  182130: "Sharanwan BO",
  182127: "Khoon BO",
  182128: "Joffar BO",
  182161: "Bapp BO",
  182125: "Kalsote BO",
  182205: "Aftee BO",
  185153: "BARNARA",
  185203: "Ransoo BO",
  182144: "Deedah BO",
  182122: "Kotwalt BO",
  182145: "Hoochak BO",
  182203: "Chunri BO",
  180001: "Jammu HO",
  180010: "Gangyal SO",
  180012: "Meghdoot Bhawan",
  180007: "Janipur High Court SO",
  184102: "Ie Kathua SO",
  190002: "Fateh Kadal SO",
  190010: "Karan Nagar SO Srinagar",
  190001: "Lal Chowk SO",
  190009: "Rambagh SO Srinagar",
  182222: "Bhaderwah SO",
  182312: "Jyotipuram SO",
  193505: "Watapora B.O",
  181131: "Allah BO",
  180003: "Mandal BO",
  181101: "Khour Devian BO",
  181224: "Tahra BO",
  184210: "GURAH KALYAL BO",
  192211: "Obindora BO",
  192304: "Sumboora BO",
  190018: "Sebdan BO",
  191103: "Zantrag BO",
  190017: "Gund Hassibhat BO",
  182132: "Kither BO",
  182142: "Madha BO",
  182315: "Balamatkot BO",
  182136: "Deherna BO",
  182311: "Bhagga BO",
  182126: "Bhatiari BO",
  182131: "Tipri BO",
  182221: "Bhalla BO",
  180015: "Chani Himat SO",
  181111: "Dablehar SO",
  181143: "Gurah Salathia SO",
  180004: "Guru Nanak Nagar SO Jammu",
  180006: "Qilla Bahu SO",
  180005: "Karan Nagar SO Jammu",
  181205: "Muthi SO",
  181208: "Bawa Talab",
  192126: "Pahalgam SO",
  190007: "Sk Airport SO",
  182104: "PTC Udhampur SO",
  182320: "SMVDU SO",
  193103: "Delina B.O",
  181145: "Khara Madana BO",
  181121: "AGOffice BO",
  192210: "Fateh Pora BO",
  182137: "Kadail BO",
  182138: "Palali BO",
  181152: "Bathindi SO",
  180016: "Krishna Nagar SO Jammu",
  180018: "Udheywala SO",
  184145: "Rajpura SO Kathua",
  190020: "Buchpora SO",
  190004: "Batwara SO",
  191121: "Brein",
  193403: "Gulmarg SO",
  190011: "Noushara SO",
  190015: "Nowgam SO",
  190005: "Sanat Nagar SO",
  190025: "Skuast SO",
  191102: "Wuyan SO",
  182206: "Dul Hasti Project SO",
  181123: "Raipur BO",
  181204: "Bardoh BO",
  190019: "Kralpora BO",
  182139: "Garh Padder BO",
  182140: "Kaban BO",
  182133: "Sukhnai BO",
  180009: "SKUASTCHATHA SO",
  181134: "AIIMS Vijaypur",
  181124: "Bsf Camp Paloura SO",
  192101: "Khanabal SO",
  190021: "Humhama SO",
  190023: "Lal Bazar SO",
  190008: "Rajbagh SO",
  191132: "Rangreth SO",
  190099: "Nodal Delivery Center Srinagar",
  184101: "Kathua HO",
  182134: "Gumri BO",
  182135: "Rinaie BO",
  181008: "Raipur Satwari",
  180020: "TRIKUTA NAGAR",
  180013: "Roopnagar Jammu Tawi SO",
  180019: "Sidhra Housing colony",
  190014: "Hyderpora SO",
  190012: "Zainakote SO",
  190024: "Zakoora",
  182207: "GANDOH SO"
};


let debounceTimer = ''
pinInput.addEventListener('input',function(e){
    let value = e.target.value
    if(value.length <= 5 ){
        locName.textContent = ''
        return
    }
    clearTimeout(debounceTimer)
locName.textContent = "Fetching Location.."
locName.style.color = "gray"
    setTimeout(()=>{
let locationName  = ''
if(locationName = locations[value]){
    locName.textContent = locationName
    locName.style.color = "darkgreen"
}
else{
    locName.textContent = "Not available"
    locName.style.color = "brown"
}
    },500)
})
  
})



// Signin floating form
// Get the elements
const openModalBtn = document.getElementById('open-modal-btn');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.querySelector('.close-btn');

function openModal(){
    modalOverlay.style.display = 'flex'
    setTimeout(function(){
 document.querySelector('.modal-content').style.transform = 'Scale(1)'
 document.querySelector('.modal-content').style.opacity = '1'
    },10)
}

function closeModal(){
    document.querySelector('.modal-content').style.transform = 'Scale(0.95)'
    document.querySelector('.modal-content').style.opacity = '0'
    setTimeout(function(){
modalOverlay.style.display = 'none'
    },100)
}

openModalBtn.addEventListener('click',openModal)
closeModalBtn.addEventListener('click',closeModal)

modalOverlay.addEventListener('click',(event) => {
    if(event.target === modalOverlay){
        closeModal()
    }
})

// Forms toggle
const form1 = document.querySelector('.form1')
const form2 = document.querySelector('.form2')
const registerBtn = document.querySelector('.registerbtn')
const loginBtn = document.querySelector('.loginbtn')

registerBtn.addEventListener('click',function(){
    form2.classList.remove('hidden')
    form1.classList.add('hidden')
})

loginBtn.addEventListener('click',function(){
    form1.classList.remove('hidden')
    form2.classList.add('hidden')
})

//Register aunthentication system
const regUserName = document.querySelector('#reg-username')
const regUserPass = document.querySelector('#reg-password')
const regEmail = document.querySelector('#reg-email')
const regBtn = document.querySelector('#regBtn')


function register(){
 const userName = regUserName.value
 const passWord = regUserPass.value
 const Email = regEmail.value

const userData = {
    username:userName,
    password:passWord,
    email : Email
}
localStorage.setItem('currentUser',JSON.stringify(userData))
    console.log('User data saved successfully!');

    let save = JSON.parse(localStorage.getItem('currentUser'))
    console.log(save)
}
 let save = JSON.parse(localStorage.getItem('currentUser'))
//login authentication system
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const logBtn = document.querySelector('#loginBtn')
let allUsers = JSON.parse(localStorage.getItem('allUsers'));
console.log(username.value.toLowerCase())
let usern = save.username
let passn = save.password


function login(e){
    if(username.value === ''){
        alert('Kindly enter your username')
        return;
    }
    else if(password.value === ''){
        alert('Kindly enter your password')
        return
    }
   if(!save){
    alert('User not found kindly register to login')
}
     if(username.value === usern && password.value === passn){
     const logedUser = {
        username:save.username,
        password:save.password,
        lognTime : new Date().getTime()
     }
     localStorage.setItem('logedUser',JSON.stringify(logedUser))
window.location.href = 'http://127.0.0.1:5500/projects/java/payment.html'
    }

    else{
        alert('wrong username or password')
    }

   
}

document.addEventListener('DOMContentLoaded', (event) => {
    const openModalBtn = document.getElementById('open-modal-btn');
    const loged = JSON.parse(localStorage.getItem('logedUser'))

    if(loged){
        openModalBtn.innerHTML = `<button id = "outBtn" >Logout </button> `
    }
    document.getElementById('outBtn').addEventListener('click',() => {
  localStorage.removeItem('logedUser')
  console.log('user logged out')
    window.location.href = 'http://127.0.0.1:5500/projects/java/home.html';
    })
  
})
