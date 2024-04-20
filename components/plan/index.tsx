import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, ListItem, Text } from "react-native-elements";
import { RootStackScreens } from "types";
import { supabase } from "utils/supabase";

type Props = NativeStackScreenProps<RootStackScreens, "Plan">;

const Plan = (props: Props) => {
  const { navigation, route } = props;
  const { session } = route.params;

  const [totalProtein, setTotalProtein] = useState('');
  const [totalCarbo, setTotalCarbo] = useState('');
  const [totalFat, setTotalFat] = useState('');

  const [loading, setLoading] = useState(true)
  // const { loading, error, data, query, mutation } = useSupabase();

  // const getProfile = async () => {
  //   await query('profiles', session?.user);
  // }

  // const updateProfile = async ({
  //   username,
  //   website,
  //   avatar_url,
  // }: {
  //   username: string
  //   website: string
  //   avatar_url: string
  // }) => {
  //   const updates = {
  //     id: session?.user.id,
  //     username,
  //     website,
  //     avatar_url,
  //     updated_at: new Date(),
  //   };

  //   await mutation('profiles', updates, session?.user);
  // }

  // useEffect(() => {
  //   if (session) {
  //     getProfile().then(() => {
  //       setUsername(data.username);
  //       setWebsite(data.website);
  //       setAvatarUrl(data.avatar_url);
  //     });
  //   }
  // }, [session])

  // if (error) {
  //   Alert.alert(error);
  // }

  useEffect(() => {
    if (session) getPlan()
  }, [session])

  async function getPlan() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('plan')
        .select(`totalprotein, totalcarbo, totalfat`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setTotalProtein(data.totalprotein)
        setTotalCarbo(data.totalcarbo)
        setTotalFat(data.totalfat)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updatePlan({
    totalprotein,
    totalcarbo,
    totalfat,
  }: {
    totalprotein: string
    totalcarbo: string
    totalfat: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        totalprotein,
        totalcarbo,
        totalfat,
      }

      const { error } = await supabase.from('plan').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const planItems = [
    {
      title: "Kcal Totales",
      value: (parseFloat(totalProtein) + parseFloat(totalCarbo) + parseFloat(totalFat)) || 0,
    },
    {
      title: "Proteínas",
      value: totalProtein || 0,
    },
    {
      title: "Carbohidratos",
      value: totalCarbo || 0,
    },
    {
      title: "Grasas",
      value: totalFat || 0,
    }
  ]

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "700" }}>
        Plan set up
      </Text>
      {
        planItems.map(item => (
          <ListItem id={item.title}>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.value}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
      {/* <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Kcal Totales" value={totalProtein + totalCarbo + totalFat} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Proteínas" value={totalCarbo || '0'} onChangeText={(text) => setTotalCarbo(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Carbohidratos" value={totalProtein || '0'} onChangeText={(text) => setTotalProtein(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Grasas" value={totalFat || '0'} onChangeText={(text) => setTotalCarbo(text)} />
      </View> */}

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Cargando...' : 'Editar'}
          onPress={() => navigation.navigate("PlanSetUp", {
            totalKcal: (totalProtein + totalCarbo + totalFat) || "0",
            totalProtein: totalProtein || "0",
            totalCarbo: totalCarbo || "0",
            totalFat: totalFat || "0",
          })}
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

export default Plan;