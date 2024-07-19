import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { ErrorComponent } from '../../../Components';
import { useForm } from '../../../hooks';
import { useEstadoStore, usePersonaStore, useTipoPersonaStore } from '../../../store';
import { COLORS } from '../../../Configs';
import { Estado } from '../../../Configs/interfaces';

const CustomerForm = () => {
  const initialState = {
    idPersona: uuid.v4().toString(),
    idEmpresa: '37ee7232-f4c9-41a0-ba75-076ffb4e6e9a',
    idTipoPersona: '1', // Changed idTipoPersona to string based on API response
    idTipoDocumento: '',
    num_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    direccion: '',
    telefono: '',
    email: '',
    estado: '1', // Changed estado to string based on API response
  };

  const validationRules = {
    primer_nombre: (value: any) => (!value ? 'El nombre es requerido' : null),
    apellido_paterno: (value: any) => (!value ? 'El apellido es requerido' : null),
    email: (value: any) => (!value ? 'El email es requerido' : null),
  };

  const [error, setError] = useState(null);

  const { formState, onChange, validateField, validateForm,resetForm } = useForm(initialState, validationRules);

  const { addCustomer,loadPersonas } = usePersonaStore();
  const { tipoPersonas, loadTipoPersonas } = useTipoPersonaStore();
  const { estados, loadEstados } = useEstadoStore();
  const [sistemaEstados, setSistemaEstados] = useState<Estado[]>([]);
  
  useEffect(() => {
    const filteredEstados = estados.filter((estado: Estado) => estado.sistema !== true);
    setSistemaEstados(filteredEstados);

    
  }, [estados]);

  useEffect(() => {
    loadTipoPersonas();
    loadEstados();
  }, [loadTipoPersonas, loadEstados]);

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      addCustomer({
        idPersona: uuid.v4().toString(),
        idEmpresa: '37ee7232-f4c9-41a0-ba75-076ffb4e6e9a',
        idTipoPersona: parseInt(formState.idTipoPersona.value),
        idTipoDocumento: parseInt(formState.idTipoDocumento.value),
        num_documento: formState.num_documento.value,
        primer_nombre: formState.primer_nombre.value,
        segundo_nombre: formState.segundo_nombre.value,
        apellido_paterno: formState.apellido_paterno.value,
        apellido_materno: formState.apellido_materno.value,
        direccion: formState.direccion.value,
        telefono: formState.telefono.value,
        email: formState.email.value,
        estado: parseInt(formState.estado.value),
      });
      loadPersonas()
      resetForm()
    }
  };

  return (
    <View>
      <Text style={styles.modalTitle}>Crear/Modificar Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={COLORS.darkBlue}
        value={formState.primer_nombre.value}
        onChangeText={(value) => onChange(value, 'primer_nombre')}
      />
      {formState.primer_nombre.error && (
        <Text style={styles.errorText}>{formState.primer_nombre.error}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor={COLORS.darkBlue}
        value={formState.apellido_paterno.value}
        onChangeText={(value) => onChange(value, 'apellido_paterno')}
      />
      {formState.apellido_paterno.error && (
        <Text style={styles.errorText}>{formState.apellido_paterno.error}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.darkBlue}
        value={formState.email.value}
        onChangeText={(value) => onChange(value, 'email')}
      />
      {formState.email.error && (
        <Text style={styles.errorText}>{formState.email.error}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor={COLORS.darkBlue}
        value={formState.telefono.value}
        onChangeText={(value) => onChange(value, 'telefono')}
      />
      <View style={styles.select}>
        <Picker
          selectedValue={formState.idTipoDocumento.value}
          style={{color: COLORS.darkBlue}}
          selectionColor={COLORS.darkBlue}
          onValueChange={(itemValue) => onChange(itemValue, 'idTipoDocumento')}
        >
          <Picker.Item label="Tipo de DNI" value={0} />
          <Picker.Item label="Cedula" value={1} />
          <Picker.Item label="Licencia" value={2} />
          <Picker.Item label="Pasaporte" value={3} />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="DNI"
        placeholderTextColor={COLORS.darkBlue}
        value={formState.num_documento.value}
        onChangeText={(value) => onChange(value, 'num_documento')}
      />
      <View style={styles.select}>
        <Picker
          selectedValue={formState.estado.value}
          onValueChange={(itemValue) => onChange(itemValue, 'estado')}
          style={{color: COLORS.darkBlue}}
          selectionColor={COLORS.darkBlue}
        >
          {sistemaEstados.map((estado) => (
            <Picker.Item key={estado.idEstado} label={estado.nombre} value={estado.idEstado} />
          ))}
        </Picker>
      </View>
      <View style={styles.select}>
        <Picker
          selectedValue={formState.idTipoPersona.value}
          onValueChange={(itemValue) => onChange(itemValue, 'idTipoPersona')}
          style={{color: COLORS.darkBlue}}
          selectionColor={COLORS.darkBlue}
        >
          {tipoPersonas.map((tipoPersona) => (
            <Picker.Item
              key={tipoPersona.idTipoPersona}
              label={tipoPersona.nombre}
              value={tipoPersona.idTipoPersona}
            />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      {error && <ErrorComponent message={error} onClose={() => setError(null)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.darkBlue,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    color: COLORS.darkBlue,
  },
  select: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 2,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    color: COLORS.darkBlue,
  },
  button: {
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  errorText: {
    color: COLORS.red,
    marginBottom: 5,
  },
});

export default CustomerForm;
