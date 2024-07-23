import React from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {loanInfo} from '../../../Configs/interfaces';
import {COLORS} from '../../../Configs';
import {formatDate} from '../../../helpers';
import {
  formatCurrency,
  formatID,
} from '../../../helpers/utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ThemeStyles} from '../../../Configs/constants/theme';

interface LoanListProps {
  loans: loanInfo[];
  openSheet: (loan: loanInfo) => void;
}

export const LoanList: React.FC<LoanListProps> = ({loans, openSheet}) => {

  return (
    <ScrollView style={styles.container}>
      {loans.length > 0 ? (
        loans.map((loan, index) => (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              elevation: 2,
              borderRadius: 8,
              marginVertical: 5,
              marginLeft: 10,
              marginRight: 10,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
            key={index}
            onPress={() => openSheet(loan)}>
            <View>
              <Text style={styles.swicheText}>
                {`Préstamo:`}
                <Text style={styles.label}>{}</Text>
              </Text>
              <View style={styles.row} >
              <Text style={styles.label}>
                  {`Cliente: `}
                  <Text style={styles.value}>
                    {'Rudy Alexander perez casilla'}
                  </Text>  
                </Text>
              </View> 
              <View style={styles.row}>
          
                <Text style={styles.label}>
                  {`Telefono: `}
                  <Text style={styles.value}>
                    {formatID('8291112334')}
                  </Text>
                </Text>
              </View>
              <View style={styles.row}>
              <Text style={styles.label}>
                  {`Monto: `}
                  <Text style={styles.value}>
                    {formatCurrency(loan.dues.mont_couta)}
                  </Text>
                </Text>
                <Text style={styles.label}>
                  {`Fecha: `}
                  <Text style={styles.value}>
                    {formatDate(loan.dues.fecha_couta.toString())}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>No hay préstamos disponibles.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...ThemeStyles,
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 10,
  },
  emptyText: {
    color: COLORS.darkBlue,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
