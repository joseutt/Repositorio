import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

export default function ApiBtc(){
    const [ response, setResponse] = useState(null);
    const [isLoading, setLoading] = useState (true);
    const [error, setError] = useState (null);

    useEffect(()=>{
        fetch()
        .then()
        .then(result =>{
            setIsLoading(false);
            setResponse(result);
        }, error =>{
            setError(error);
            setLoading(false);
        })
    },[]);

    const getContent = () => {
        if (isLoading) {
            <View>
                <Text style= {styles.textSize}>Loading data</Text>
                <ActivityIndicator />
            </View>
        }
        if (error) {
            return <Text>{error}</Text>
        }
    }

    return(
        <View>
            <Text>BYC TO USD: {response["bpi"]["USD"].rate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textSize: {
        frontSize: "20"
    },
})