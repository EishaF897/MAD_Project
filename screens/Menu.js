import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Dimensions  } from 'react-native';
import { db } from '../configure/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Context } from '../components/context'; // Import CartContext
import Header from '../components/header';
import Model from '../components/model'

const { width: screenWidth } = Dimensions.get('window');

const Menu = ({ navigation }) => {
  const [mainMenu, setMainMenu] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [deals, setDeals] = useState([]);
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPizza, setCurrentPizza] = useState(null);
  const { pizzaAddToCart } = useContext(Context);
  const { addToCart } = useContext(Context); // Access the addToCart function


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const mainMenuSnapshot = await getDocs(collection(db, 'mainMenu'));
        const mainMenuList = mainMenuSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const newArrivalsSnapshot = await getDocs(collection(db, 'newArrivals'));
        const newArrivalsList = newArrivalsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const dealsSnapshot = await getDocs(collection(db, 'deals'));
        const dealsList = dealsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const extraSnapshot = await getDocs(collection(db, 'menu'));
        const extraList = extraSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMainMenu(mainMenuList);
        setNewArrivals(newArrivalsList);
        setDeals(dealsList);
        setExtras(extraList);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#B22222" />
        <Text>Loading...</Text>
      </View>
    );
  }


  const renderSliderItem = ({ item }) => {

    return (
      <View style={styles.sliderItemContainer}>
        {/* Display image if available */}
        {item.Image ? (
          <Image source={{ uri: item.Image }} style={styles.image} />
        ) : null}
        <Text style={styles.name} numberOfLines={1}>{item.Name || 'Unnamed Item'}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.Description || 'No Description Available'}</Text>
        <Text style={styles.price} numberOfLines={1}>Rs {item.Price || 'No Price Available'}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(item)} // Add to cart logic
      >
        <Text style={styles.buttonText}>ADD TO CART</Text>
      </TouchableOpacity>
      </View>
    );
  };

  const renderExtra = ({ item }) => (
    <View style={styles.extraCard}>
      <Image source={{ uri: item.Image }} style={styles.extraImage} />
      <View style={styles.extraDetails}>
        <Text style={styles.extraName}>{item.Name}</Text>
        <Text style={styles.extraSize}>Size: {item.Size}</Text>
        <Text style={styles.extraPrice}>Price: Rs {item.Price}</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => addToCart(item)} // Add to cart
          >
            <Text style={styles.buttonText}>ADD TO CART</Text>
          </TouchableOpacity>
      </View>
    </View>
  );

  const openSizeModal = (pizza) => {
    setCurrentPizza(pizza);
   setModalVisible(true); 
  }

  const renderMainMenu = ({ item }) => (
    <View style={styles.pizzaRow}>
    <Image source={{ uri: item.Image }} style={styles.pizzaImage} />
      <View style={styles.extraDetails}>
        <Text style={styles.pizzaName}>{item.Name}</Text>
        <Text style={styles.pizzaDescription}>{item.Description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openSizeModal(item)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );




  return (
    <ScrollView style={styles.container}>

      <Header/>


      <View style={styles.Sections}>
        <Text style={styles.sectionTitle}>Main Menu</Text>
          {mainMenu.length > 0 ? (
            <FlatList
              data={mainMenu} 
              renderItem={renderMainMenu}
              keyExtractor={(item) => item.id}
              style={styles.mainMenuList}
            />
          ) : (
            <Text style={styles.emptyText}>No Main Menu available</Text>
          )}
        </View>



        <Model
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          currentPizza={currentPizza}
        />


     <View style={styles.Sections}>
      <Text style={styles.sectionTitle}>New Arrivals</Text>
        {newArrivals.length > 0 ? (
          <FlatList
            data={newArrivals}
            renderItem={renderSliderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        ) : (
          <Text style={styles.emptyText}>No new arrivals available</Text>
        )}
        </View>




      <View style={styles.Sections}>
        <Text style={styles.sectionTitle}>Deals</Text>
        {deals.length > 0 ? (
          <FlatList
            data={deals}
            renderItem={renderSliderItem}
            horizontal
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        ) : (
          <Text style={styles.emptyText}>No deals available</Text>
        )}
      </View>



      <View style={styles.Sections}>
        <Text style={styles.sectionTitle}>Extras</Text>
          {extras.length > 0 ? (
            <FlatList
              data={extras}
              renderItem={renderExtra}
              keyExtractor={(item) => item.id}
              style={styles.extraList}
            />
          ) : (
            <Text style={styles.emptyText}>No extras available</Text>
          )}
        </View>

      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate('Cart')} // Navigate to Cart screen
      >
        <Text style={styles.viewCartText}>VIEW CART</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Sections: {
    marginBottom: 60,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#B22222',
    textAlign: 'center',
  },
  flatListContainer: {
    paddingVertical: 10,
  },

  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10, // Space between the image and text
    resizeMode: 'contain', // Ensures image fits within the container
  },

  sliderItemContainer: {
    width: screenWidth * 0.7, // 70% of the screen width
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },

  pizzaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginVertical: 10,
  },

  pizzaItem: {
    width: '45%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },

  pizzaImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  pizzaName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },

  pizzaDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 5, // Prevents text from touching container edges
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B22222',
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginVertical: 20,
  },

  extraCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  extraImage: {
    width: 90,
    height: 150,
    borderRadius: 10,
  },
  extraDetails: {
    flex: 1,
    marginLeft: 15,
  },
  extraName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  extraSize: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },

  extraPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },

  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '40%',
    marginTop: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
})

export default Menu;