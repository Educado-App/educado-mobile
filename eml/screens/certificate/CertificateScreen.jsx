import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/general/BackButton';
import Text from '../../components/general/Text';
import FilterNavBar from '../../components/explore/FilterNavBar';
import CertificateCard from '../../components/certificate/CertificateCard';
import { determineCategory } from '../../services/utilityFunctions';
import { fetchCertificates } from '../../api/api';
import { getUserInfo } from '../../services/StorageService';

/**
 * Profile screen
 * @returns {React.Element} Component for the profile screen
 */
export default function CertificateScreen() {
  // Sets dummy data for courses (will be replaced with data from backend)
  const [certificates, setCertificates] = useState([]);
  // Search text state
  const [searchText, setSearchText] = useState('');
  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getProfile = async () => {
    try {
      const fetchedProfile = await getUserInfo();
      if (fetchedProfile !== null) {
        const fetchedCertificates = await fetchCertificates(fetchedProfile.id);
        setCertificates(fetchedCertificates);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const navigation = useNavigation();

  const filteredCertificates = certificates && certificates.filter((certificate) => {
    // Check if the course title includes the search text
    const titleMatchesSearch = (certificate.courseName || '').toLowerCase().includes(searchText.toLowerCase());
    // Check if the course category matches the selected category (or no category is selected)
    const categoryMatchesFilter = !selectedCategory || determineCategory(certificate.courseCategory) === selectedCategory;
    // Return true if both title and category conditions are met
    return titleMatchesSearch && categoryMatchesFilter;
  });

  const handleFilter = (text) => {
    setSearchText(text);
  };

  const handleCategoryFilter = (category) => {
    //if category label is "all" it will display all certificates, 
    //otherwise it will display certificates with the selected category
    if (category === 'Todos') {
      setSelectedCategory(null); // Set selectedCategory to null to show all items
    } else {
      setSelectedCategory(category); // Set selectedCategory to the selected category label
    }
  };

  return (
    <SafeAreaView className='bg-secondary'>
      <View className='h-full'>
        <View className='relative mx-4 mt-12 mb-6'>
          <BackButton onPress={() => navigation.navigate('Perfil')} />

          <Text className='w-full text-center text-xl font-sans-bold'>
            Certificados
          </Text>
        </View>


        <FilterNavBar
          searchPlaceholder={'Buscar certificados'}
          onChangeText={(text) => handleFilter(text)}
          onCategoryChange={handleCategoryFilter}
        />
        <ScrollView showsVerticalScrollIndicator={true}>
          <View>
            {certificates.length !== 0 ? filteredCertificates.map((certificate, index) => (
              <CertificateCard
                key={index}
                certificate={certificate}
              ></CertificateCard>
            )) : <Text className="justify-center mx-auto">sem certificados</Text>}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}