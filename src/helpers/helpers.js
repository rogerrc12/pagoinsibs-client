export function formatAmount(amount) {
  return Number(amount).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Toggle btn mobile nav
export function toggleMobile(e, nav, header) {
  const btn = e.currentTarget;

  if (btn.classList.contains("open")) {
    btn.classList.remove("open");
    nav.classList.remove("show");
    header.classList.remove("navOpen");

    setTimeout(() => {
      nav.style.display = "none";
    }, 400);
  } else {
    btn.classList.add("open");
    nav.style.display = "block";
    header.classList.add("navOpen");

    setTimeout(() => {
      nav.classList.add("show");
    }, 10);
  }
}

// close MobileNav from mobile links
export function closeMobileNav(e, btn) {
  const nav = e.currentTarget;
  const link = e.target;

  if (link.classList.contains("mobile-nav__link")) {
    nav.classList.remove("show");
    btn.classList.remove("open");
  }
}

// Toggle password visibility
export function togglePassword() {
  const inputPassword = document.getElementById("password");
  const inputConfirmPassword = document.getElementById("confirm_password");
  const iconPassword = document.getElementById("password_icon");
  const iconConfirmPassword = document.getElementById("confirm_password_icon");

  if (inputPassword.type === "text") {
    inputPassword.type = "password";
    if (inputConfirmPassword) inputConfirmPassword.type = "password";

    iconPassword.classList.remove("fa-eye-slash");
    iconPassword.classList.add("fa-eye");
    if (inputConfirmPassword) {
      iconConfirmPassword.classList.remove("fa-eye-slash");
      iconConfirmPassword.classList.add("fa-eye");
    }
  } else {
    inputPassword.type = "text";
    if (inputConfirmPassword) inputConfirmPassword.type = "text";

    iconPassword.classList.remove("fa-eye");
    iconPassword.classList.add("fa-eye-slash");
    if (inputConfirmPassword) {
      iconConfirmPassword.classList.remove("fa-eye");
      iconConfirmPassword.classList.add("fa-eye-slash");
    }
  }
}

// Set authenticated class to root
export function addAuthenticatedClass() {
  const root = document.getElementById("root");

  if (!root.classList.contains("authenticated")) {
    root.classList.add("authenticated");
  }
}

// Remove authenticated class to root
export function removeAuthenticatedClass() {
  const root = document.getElementById("root");

  if (root.classList.contains("authenticated")) {
    root.classList.remove("authenticated");
  }
}

// Set amount to currency
export function setCurrency(number) {
  const formatter = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(+number);
}

// Set Credit Card years
export function setCcYears() {
  let yearsArray = [];
  const date = new Date();

  for (let i = 0; i <= 10; i++) {
    let year = date.getFullYear() + i;
    yearsArray.push(year);
  }

  return yearsArray;
}

// Set payment frequency base on payment period selection (direct debit)
export function setPaymentFrequency(period, months) {
  let paymentPeriod = [];

  switch (period) {
    case "semanal":
      let monthsCount;
      if (months === 12) {
        monthsCount = 4.34;
      } else {
        monthsCount = 4;
      }
      for (let i = 3; i < months * monthsCount; i++) {
        let content = {
          label: `En ${i + 1} ${i === 0 ? "semana" : "semanas"}`,
          value: i + 1,
        };
        paymentPeriod.push(content);
      }
      break;
    case "quincenal":
      for (let i = 1; i < months * 2; i++) {
        let content = {
          label: `En ${i + 1} ${i === 0 ? "quincena" : "quincenas"}`,
          value: i + 1,
        };
        paymentPeriod.push(content);
      }
      break;
    case "mensual":
      for (let i = 0; i < months; i++) {
        let content = {
          label: `En ${i + 1} ${i === 0 ? "mes" : "meses"}`,
          value: i + 1,
        };
        paymentPeriod.push(content);
      }
      break;
    default:
      return paymentPeriod;
  }

  return paymentPeriod;
}
