import { StatusBar } from 'expo-status-bar';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';

import { Colors } from '../../Constants';
import { TypeAccount } from '../../GlobalTypes';
import getRealm from '../../schemas';
import { SvgBack } from '../../screens/AddRelease/SvgBack';
import SelectButton from '../SelectButton';
import { Text } from '../Text';
import styles from './styles';

interface ModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const ModalAdd: React.FC<ModalProps> = ({ onClose, open }) => {
  const [account, setAccount] = useState<TypeAccount>();
  async function handleSave() {
    try {
      const realm = await getRealm();

      realm.write(() => {
        realm.create<TypeAccount>('Accounts', {
          ...account,
          id: realm.objects('Accounts').length + 1,
          created: new Date(),
        } as TypeAccount);
      });
      onClose((prev) => !prev);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', `Error message: ${JSON.stringify(error)}`);
    }
  }

  return (
    <Modal
      transparent
      animationType="slide"
      visible={open}
      onRequestClose={() => onClose((prev) => !prev)}
    >
      <View style={styles.containerOverlay}>
        <StatusBar
          backgroundColor="rgba(25, 22, 34, 0.7)"
          animated
          hideTransitionAnimation="slide"
          translucent
        />
        <View style={styles.containerContent}>
          <Text style={styles.textHeader}>Adicionar</Text>
          <Text style={styles.textLaunch}>Banco</Text>
          <SelectButton
            selectedValue={({ text, value }) =>
              setAccount(
                (prev) => ({ ...prev, type: value, bank: text } as TypeAccount)
              )
            }
            values={[
              { text: 'CAIXA', value: '1' },
              { text: 'BRADESCO', value: '0' },
            ]}
          />

          <Text style={styles.text}>Nome: </Text>
          <TextInput
            onChangeText={(text) =>
              setAccount((prev) => ({ ...prev, name: text } as TypeAccount))
            }
            style={styles.textInput}
            placeholder="Identificação"
          />
          <Text style={styles.text}>Valor:</Text>
          <TextInput
            onChangeText={(text) =>
              setAccount(
                (prev) => ({ ...prev, value: Number(text) } as TypeAccount)
              )
            }
            style={styles.textInput}
            placeholder="R$"
          />
          <Text style={styles.text}>Breve Descrição:</Text>
          <TextInput
            onChangeText={(text) =>
              setAccount(
                (prev) => ({ ...prev, description: text } as TypeAccount)
              )
            }
            style={styles.textInput}
            placeholder="Descrição"
          />
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.textButton}>LANÇAR</Text>
          </TouchableOpacity>
          <SvgBack />
        </View>
      </View>
    </Modal>
  );
};

export { ModalAdd };
