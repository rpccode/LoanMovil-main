import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../Configs'; // Asegúrate de importar tu paleta de colores
import {formatCurrency} from '../helpers/utils';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type crediCardProp = {
  titleCard: string;
  cardNumber: string;
  expires: string;
  colorText: string;
};

const CreditCard = ({
  titleCard,
  cardNumber,
  expires,
  colorText,
}: crediCardProp) => {
  return (
    <View style={styles.creditCard}>
      <View style={styles.cardHeader}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.darkBlue,
            textTransform: 'uppercase',
          }}>
          {titleCard}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={{...styles.cardNumber, fontSize: 14, color: colorText}}>
          {formatCurrency(parseInt(cardNumber))}
        </Text>
        <Text style={styles.expires}>{expires}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  creditCard: {
    width: SCREEN_WIDTH - 32, // Ancho total menos el padding del contenedor
    maxWidth: 170,
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.base, // Fondo blanco para contraste con el degradado
    shadowColor: COLORS.black, // Sombra en negro según tu paleta
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 40,
  },
  cardBody: {
    paddingHorizontal: 14,
  },
  cardNumber: {
    marginBottom: 15,
    // Texto gris según tu paleta
  },
  cardHolder: {
    fontSize: 14,
    marginBottom: 10,
    color: COLORS.darkGray, // Texto gris oscuro según tu paleta
  },
  expires: {
    fontSize: 14,
    color: COLORS.darkGray, // Texto gris oscuro según tu paleta
  },
});

export default CreditCard;
