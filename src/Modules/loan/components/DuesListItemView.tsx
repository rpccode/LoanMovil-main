import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, GestureResponderEvent, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../../../Configs';
import { formatDate } from '../../../helpers';
import { Customer, LoanDetail } from '../../../Configs/interfaces';
// import { calculateShadowRadius, moderateScale } from '../../../helpers/utils';

const DuesListItemView = ({ item, handleItemPress }: { item: LoanDetail; handleItemPress?: () => void })=> {
//  console.log(item.LastName)

  return (
    <TouchableWithoutFeedback
    onPress={handleItemPress}>
    <View style={styles.mainCardView}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.subCardView}>
          {/* <Image
            source={require('../assets/person.png') }
            resizeMode="contain"
            style={{
              borderRadius: 25,
              height: 50,
              width: 50,
              
            }}
          /> */}
         <Icon name='person' color={COLORS.red} size={50} />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.nameText}>{item.LoanId+ '---'+ item.Dues_num}</Text>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>{formatDate(item.Start_date.toString())}</Text>
            <Text style={styles.emailText}>{item.Total_amount}</Text>

          </View>
        </View>
      </View>
      <View style={styles.infoIdContainer}>
        <Text style={styles.infoIdText}>{item.Total_amount}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    height: moderateScale(90),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: calculateShadowRadius(15), // Convertir a número
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: calculateShadowRadius(8),
    elevation: 8,
    flexDirection: 'row',
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(16),
    marginHorizontal: moderateScale(16),
    marginTop: moderateScale(6),
    marginBottom: moderateScale(6),
  },
  subCardView: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: calculateShadowRadius(25),
    backgroundColor: COLORS.darkGray,
    borderColor: COLORS.charcoal,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: calculateShadowRadius(14),
    color: COLORS.black,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emailContainer: {
    marginTop: moderateScale(4),
    width: '100%',
  },
  emailText: {
    color: COLORS.gray,
    fontSize: calculateShadowRadius(12),
  },
  infoIdContainer: {
    height: moderateScale(25),
    width: moderateScale(25),
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: calculateShadowRadius(50),
    marginLeft: moderateScale(-26),
  },
  infoIdText: {
    color: COLORS.white,
  },
});

export default DuesListItemView

function moderateScale(size: number): any {
  const { width, height } = Dimensions.get('window');
  const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = width / guidelineBaseWidth;
return size * scale;
}
function calculateShadowRadius(value: number): any {
  return value;
}

