import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import axios from 'axios';

const NewsScreen = ({ route, navigation }) => {
    const { category } = route.params || { category: 'general' };
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchNews(category);
    }, [category]);

    const fetchNews = async (category) => {
        try {
            const response = await axios.get(
                ` https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=d4b65b1ef4d64c1eb93c1258663fe9eb`
            );

            const articles = response.data.articles;

            setArticles(articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleArticlePress = (article) => {
        navigation.navigate('NewsDetail', { article });
    };

    const renderArticleItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleArticlePress(item)}>
            <Card>
                <Card.Image source={{ uri: item.urlToImage }} />
                <Card.Title>{item.title}</Card.Title>
                <Card.Divider />
                <Text>{item.description}</Text>
                <ListItem>
                    <ListItem.Content>
                        {/* <ListItem.Subtitle>ID: {item.source.id}</ListItem.Subtitle> */}
                        <ListItem.Subtitle>Source: {item.source.name}</ListItem.Subtitle>

                    </ListItem.Content>
                </ListItem>
            </Card>
        </TouchableOpacity>
    );

    const limitedArticles = articles.slice(0, 10); // Limiting to 10 items

    return (
        <View>
            <Text h2>News | {category}</Text>
            <FlatList
                data={limitedArticles}
                keyExtractor={(item) => item.title}
                renderItem={renderArticleItem}
            />
        </View>
    );
};

export default NewsScreen;
