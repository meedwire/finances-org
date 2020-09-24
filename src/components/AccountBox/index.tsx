import { EvilIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  cond,
  Easing,
  eq,
  interpolate,
  set,
  useCode,
} from 'react-native-reanimated';
import { timing, useValue, bin } from 'react-native-redash';

import { Colors } from '../../Constants';
import { TypeAccount } from '../../GlobalTypes';
import { money } from '../../Utils';
import getRealm from '../../schemas';
import Button from '../Button';
import { Text } from '../Text';
import styles from './styles';

interface Props {
  account: TypeAccount;
}

const AccountBox: React.FC<Props> = ({ account }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const refInput = useRef<TextInput>() as React.RefObject<TextInput>;
  const scale = useValue(1);

  function handleChange() {
    setEditable((prev) => !prev);

    if (refInput && editable) {
      refInput.current?.focus();
    }
  }

  async function handleDelete() {
    const realm = await getRealm();

    const accountDelete = realm
      .objects('Accounts')
      .filtered('id == $0', account.id);

    realm.write(() => {
      realm.delete(accountDelete);
    });
  }

  async function handleSave() {
    const realm = await getRealm();

    realm.write(() => {
      const [accountEditable] = realm
        .objects<TypeAccount>('Accounts')
        .filtered('id == $0', account.id);

      console.log(accountEditable);

      if (name) {
        accountEditable.name = name;
      }
      if (description) {
        accountEditable.description = description;
      }
    });
    setEditable((prev) => !prev);
  }

  const style = StyleSheet.create({
    boxTextInput: {
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      borderRadius: 10,
      marginLeft: 10,
      paddingHorizontal: 6,
      borderColor: editable ? Colors.CYAN : 'transparent',
    },
  });

  useCode(
    () => [
      cond(
        eq(bin(editable), 1),
        set(
          scale,
          timing({
            duration: 500,
            easing: Easing.elastic(3),
            from: 1,
            to: 1.05,
          })
        ),
        set(
          scale,
          timing({
            duration: 300,
            easing: Easing.elastic(),
            from: 1.05,
            to: 1,
          })
        )
      ),
    ],
    [editable]
  );

  return (
    <Animated.View
      style={[
        styles.boxAccount,
        {
          backgroundColor: editable
            ? 'rgb(90,75,129)'
            : 'rgba(90,75,129, 0.95)',
          transform: [{ scale }],
          elevation: interpolate(scale, {
            inputRange: [1, 1.05],
            outputRange: [1, 10],
          }),
        },
      ]}
    >
      <Button
        onPress={!editable ? handleChange : handleSave}
        style={[styles.boxButtonEdit, { right: editable ? 40 : 10 }]}
      >
        <EvilIcons
          name={!editable ? 'pencil' : 'check'}
          size={30}
          color={Colors.CYAN}
        />
      </Button>
      {editable && (
        <Button onPress={handleDelete} style={styles.boxButtonDelete}>
          <EvilIcons name="trash" size={30} color={Colors.CYAN} />
        </Button>
      )}
      <Text style={styles.textNameAccount}>{account.bank}</Text>
      <View style={styles.boxText}>
        <Text style={styles.textAccount}>NAME:</Text>
        <View style={style.boxTextInput}>
          <TextInput
            onChangeText={(text) => setName(text)}
            ref={refInput}
            editable={editable}
            defaultValue={name || account.name}
            style={styles.textAccount}
          />
        </View>
      </View>
      <View style={styles.boxText}>
        <Text style={styles.textAccount}>TIPO:</Text>
        <View style={style.boxTextInput}>
          <TextInput
            onChangeText={(text) => setDescription(text)}
            editable={editable}
            defaultValue={description || account.description}
            style={styles.textAccount}
          />
        </View>
      </View>
      <Text style={styles.textCurrMoney}>Saldo Atual</Text>
      <View style={styles.boxMoney}>
        <Text>{money(account.value)}</Text>
      </View>
    </Animated.View>
  );
};

export { AccountBox };
