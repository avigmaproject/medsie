import React, {Component} from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Text, Title} from 'react-native-paper';
import Icons from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import {connect} from 'react-redux';

import BackHeader from '../../components/back-header/back-header.component';
import InputTextIcon from '../../components/input-text-icon/input-text-icon.component';
import ResultCategory from '../../components/result-component/result-component.component';
import SearchTextInput from '../../components/search-text-input/search-text-input.component';
import Filter from '../../assets/svg-files/filter.svg';

import styles from './search-and-filter.style';

class SearchAndFilter extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      data: [],
      filterData: [],
    };
  }

  componentDidMount() {
    const {navigation, route, search} = this.props;
    const {data} = route.params;
    navigation.addListener('focus', () => {
      this.setState({data: data[0], filterData: data[0], search: search}, () =>
        this.handleSearch(),
      );
    });
  }

  handleSearch = () => {
    const {filterData, search} = this.state;
    const formatQuery = search.toLowerCase();
    const data = _.filter(filterData, (keywords) => {
      return this.contains(keywords, formatQuery);
    });
    this.setState({data: data, search: search});
  };

  contains = ({Buss_Name}, query) => {
    console.log(`Buss_Name: ${Buss_Name}`);
    if (Buss_Name !== null && Buss_Name !== '') {
      if (Buss_Name.toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };

  back = (navigation) => (
    <TouchableOpacity
      style={styles.titleView}
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        })
      }>
      <View style={styles.rowObject}>
        <View>
          <Icons name="arrowleft" color={'rgb(33, 47, 60)'} size={24} />
        </View>
        <Title
          style={[
            styles.title,
            {
              color: 'rgb(33, 47, 60)',
            },
          ]}>
          Back
        </Title>
      </View>
    </TouchableOpacity>
  );

  render() {
    const {navigation} = this.props;
    const {search, data} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.back}>{this.back(navigation)}</View>
        <View style={styles.innerContainer}>
          <View style={styles.searchView}>
            <SearchTextInput
              value={search}
              onChangeText={(search) =>
                this.setState({search}, () => this.handleSearch())
              }
            />
            <TouchableOpacity
              style={styles.tune}
              onPress={() => navigation.navigate('FilterModal')}>
              <Filter width={30} height={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.resultContainer}>
            <Text>Results</Text>
            <ResultCategory list={data} navigation={navigation} />
            {data.length === 0 ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30}}>No Data found</Text>
              </View>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({homeContent: {search}}) => ({
  search,
});

export default connect(mapStateToProps)(SearchAndFilter);
