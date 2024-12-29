export function validateRegister(credentials) {
    
    const errors = {};
  
    if (!credentials.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Email is invalid.";
    }
  
    if (!credentials.password) {
      errors.password = "Password is required.";
    } else if (credentials.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
  
    return errors;
  }
  
  export function validateLogin(credentials) {
    const errors = {};
  
    if (!credentials.email) {
      errors.email = "Email is required.";
    }
  
    if (!credentials.password) {
      errors.password = "Password is required.";
    }
  
    return errors;
  }
  
  export function validateQuote(content, source) {
    const errors = {};
  
    if (!content.trim()) {
      errors.content = "Quote text is required.";
    }
  
    if (!source.trim()) {
      errors.source = "Quote source is required.";
    }
  
    return errors;
  }
  