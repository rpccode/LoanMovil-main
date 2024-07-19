
import { AxiosInstance } from 'axios';
import { realmConfig } from './realmConfig';
import {
    Customer,
    LoginData,
    Usuario,
    RegisterData,
    LoginResponse,
    UserResponse,
    Loan,
    LoanResponse,
    LoanDetail,
    LoanDetailResponse,
    loanWhitDues,
    customerResponse,


} from './interfaces'
import { COLORS, FONTS, SIZES, icons, images, theme } from './constants';
import { authReducer } from './Reducer/authReducer';



export type {
    Customer,
    LoginData,
    Usuario,
    RegisterData,
    LoginResponse,
    UserResponse,
    Loan,
    LoanResponse,
    LoanDetail,
    LoanDetailResponse,
    loanWhitDues,
    customerResponse,
    AxiosInstance,
  

}

export {
    authReducer,
    realmConfig,
    images,
    icons,
    theme,
    COLORS,
    SIZES,
    FONTS

}