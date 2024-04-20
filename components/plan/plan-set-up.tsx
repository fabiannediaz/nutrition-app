import { useState, useEffect } from 'react'
import { supabase } from 'utils/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input, ListItem, Text } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamsList } from 'App'

type PlanSetUpProps = NativeStackScreenProps<RootStackParamsList, "PlanSetUp">;

const PlanSetUp = (props: PlanSetUpProps) => {
  const { route } = props;
  const { totalKcal, totalProtein, totalCarbo, totalFat } = route.params;

  // const [totalProtein, setTotalProtein] = useState('');
  // const [totalCarbo, setTotalCarbo] = useState('');
  // const [totalFat, setTotalFat] = useState('');

  const [loading, setLoading] = useState(true)

  // async function updatePlan({
  //   totalprotein,
  //   totalcarbo,
  //   totalfat,
  // }: {
  //   totalprotein: string
  //   totalcarbo: string
  //   totalfat: string
  // }) {
  //   try {
  //     setLoading(true)
  //     if (!session?.user) throw new Error('No user on the session!')

  //     const updates = {
  //       id: session?.user.id,
  //       totalprotein,
  //       totalcarbo,
  //       totalfat,
  //     }

  //     const { error } = await supabase.from('plan').upsert(updates)

  //     if (error) {
  //       throw error
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       Alert.alert(error.message)
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Kcal Totales" value={totalKcal} />
      </View>

      <View style={styles.verticallySpaced}>
        <Input label="Proteínas" value={totalCarbo}
        // onChangeText={(text) => setTotalCarbo(text)} 
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Carbohidratos" value={totalProtein}
        // onChangeText={(text) => setTotalProtein(text)} 
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Grasas" value={totalFat}
        // onChangeText={(text) => setTotalCarbo(text)} 
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={'Siguiente'}
          // onPress={() => updatePlan({ totalprotein: totalProtein, totalcarbo: totalCarbo, totalfat: totalFat })}
          disabled={loading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})

export default PlanSetUp;