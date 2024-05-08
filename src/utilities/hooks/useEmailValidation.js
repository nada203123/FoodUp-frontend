const useEmailValidation = () => {
    const validateEmail = (email) => {
       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       return regex.test(email);
    };
    return validateEmail;
};

export default useEmailValidation;