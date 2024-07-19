import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // Colores base
  base: '#F5F5F5', // Gris claro
  base1: '#D6D6D6', // Gris medio
  primary: '#007BFF', // Azul
  secondary: '#0056B3', // Azul oscuro

  // Verdes
  green: '#28A745', // Verde
  lightGreen: '#D4EDDA', // Verde claro
  lime: '#A0E75A', // Verde lima
  emerald: '#50C878', // Esmeralda

  // Rojos
  red: '#DC3545', // Rojo
  lightRed: '#F8D7DA', // Rojo claro
  darkRed: '#8B0000', // Rojo oscuro

  // Púrpuras
  purple: '#6F42C1', // Púrpura
  lightPurple: '#E2D9F3', // Púrpura claro
  darkPurple: '#4B0082', // Púrpura oscuro

  // Amarillos
  yellow: '#FFC107', // Amarillo
  lightYellow: '#FFF3CD', // Amarillo claro
  darkYellow: '#FFD700', // Amarillo oscuro

  // Azules
  blue: '#0056B3', // Azul
  lightBlue: '#D1ECF1', // Azul claro
  darkBlue: '#002D62', // Azul oscuro

  // Naranjas
  orange: '#FD7E14', // Naranja
  lightOrange: '#FFE5B4', // Naranja claro
  darkOrange: '#FF4500', // Naranja oscuro
  shadow: '#000000',
  // Grises
  black: '#343A40', // Negro
  white: '#FFFFFF', // Blanco
  lightGray2: '#ccc', // Gris claro
  lightGray: '#E9ECEF', // Gris claro
  gray: '#ADB5BD', // Gris
  darkGray: '#6C757D', // Gris oscuro
  charcoal: '#36454F', // Gris carbón

  navyBlue: '#264653', // Azul Marino
  mintGreen: '#2A9D8F', // Verde Menta
  ivory: '#F4F1DE', // Blanco Hueso
  darkGreen: '#1D3557', // Verde Oscuro
  mustardYellow: '#E9C46A', // Amarillo Mostaza
  coral: '#F08080', // Rosa Coral
  lightBlueAccent: '#A8DADC', // Azul Claro
  // Transparente
  transparent: 'transparent', // Transparente
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 20},
  h6: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 18},

  body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 22},
  body6: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 20},
  body7: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 18},
  body8: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 16},

};

export const ThemeStyles = StyleSheet.create({
  containerr: {
    flex: 1,
    backgroundColor: COLORS.base
  },
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  HomeContainer: {
    paddingHorizontal: SIZES.padding * 3,
  },
  globalMargin: {
    marginHorizontal: 20,
  },
  label2: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.gray,
  },
  value2: {
    marginBottom: 10,
    color: COLORS.blue,
  },
  input: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  bannerContainer: {
    height: 120,
    borderRadius: 20,
  },
  swicheText: {
    fontSize: 25,
    margin: 6,
  },
  swichRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.base,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color: COLORS.darkBlue,
  },
  addButton: {
    backgroundColor: COLORS.darkBlue,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  HeaderContainer: {
    flexDirection: 'row',
    height: '10%',
    shadowRadius: 10,
    shadowOpacity: 0.2,  
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    shadowColor: COLORS.black,
    backgroundColor: COLORS.base
  },
  headerTitle:{
    color: COLORS.darkBlue,
    ...FONTS.h6,
    marginLeft: SIZES.padding,
  },
 
  section: {
    padding: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  value: {
    color: COLORS.blue,
  },
  inputDetail: {
    borderWidth: 1,
    borderColor: COLORS.lightGray2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: COLORS.darkBlue,
  },
  calculateButton: {
    backgroundColor: COLORS.darkBlue,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  calculateButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickerContainer: {
    padding: 4,
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 6,
    marginBottom: 10,
    color: COLORS.darkBlue,
  },
  textInput: {
    ...FONTS.body3,
    color: COLORS.darkBlue,
  },
  statusUpToDate: {
    color: COLORS.green,
    fontWeight: 'bold',
  },
  statusOverdue: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
  title: {
    ...FONTS.h1,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subtitle: {
    color: COLORS.darkGray,
    marginTop: 5,
  },
  filterButton: {
    backgroundColor: COLORS.darkBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  filterButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.lightGray2,
    padding: 20,
    width: 350,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.darkBlue,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
    width: '100%',
    color: COLORS.darkBlue
  },
  picker: {
    height: 40,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.gray,
    color: COLORS.darkBlue
  },
  applyButton: {
    backgroundColor: COLORS.darkBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    color: COLORS.darkBlue
  },
  applyButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personName: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.darkBlue,
  },
  addButton2: {
    backgroundColor: COLORS.darkBlue,
    padding: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: '#f5f5f5',
    padding: 4,
    marginBottom: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    width: '100%',
    height: 30,
  },
  tabBar: {
    backgroundColor: COLORS.darkBlue,
  },
  emptyText: {
    color: COLORS.darkBlue,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  sheetContainer: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: COLORS.green,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  confirmButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modifyButton: {
    backgroundColor: COLORS.blue,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  modifyButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: COLORS.orange,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  shareButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

const appTheme = {COLORS, SIZES, FONTS, ThemeStyles};

export default appTheme;
