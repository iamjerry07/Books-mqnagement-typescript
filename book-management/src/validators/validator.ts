import mongoose from 'mongoose';

const isValidField = (value: any): boolean => {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false;

    return true;
};

const isValidRequestBody = (requestBody: Record<string, any>): boolean => {
    return Object.keys(requestBody).length > 0;
};

const isValidURL = (link: string): boolean => {
    return (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(link));
};

const isValidMobileNo = (mobile: string): boolean => {
    return (/((\+91)?0?)?[1-9]\d{9}/.test(mobile));
};

const isValidEmail = (email: string): boolean => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
};

const isValidObjectId = (ObjectId: any): boolean => {
    if (!mongoose.Types.ObjectId.isValid(ObjectId)) return false;

    return true;
};

const isValidISBN = (ISBN: string): boolean => {
    return (/^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/.test(ISBN));
};

const isValidReviewerName = (value: any): boolean => {
    if (typeof value === 'number') return false;
    return true;
};

const isValidRating = (value: number): boolean => {
    return value % 1 === 0;
};

const isValidNumber = (value: number): boolean => {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value !== 'number') return false;

    return true;
};

export default {
    isValidField,
    isValidRequestBody,
    isValidEmail,
    isValidMobileNo,
    isValidURL,
    isValidObjectId,
    isValidISBN,
    isValidReviewerName,
    isValidRating,
    isValidNumber
};
