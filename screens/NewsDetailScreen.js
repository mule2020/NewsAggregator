import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NewsDetailScreen = ({ route }) => {
  const { article } = route.params;
  const [fullContent, setFullContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFullContent();
  }, []);

  const fetchFullContent = async () => {
    try {
      const response = await axios.get(article.url);
      const htmlContent = response.data;
      // Extract the full content from the HTML response based on the structure of the source website.
      // You may need to use libraries like cheerio or implement custom parsing logic here.
      const fullContent = extractFullContent(htmlContent);
      setFullContent(fullContent);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching full content:', error);
      setIsLoading(false);
    }
  };

  const extractFullContent = (htmlContent) => {
    // Implement your custom logic here to extract the full content from the HTML response.
    // This can involve using libraries like cheerio or applying string manipulation techniques based on the structure of the source website.
    // Return the extracted full content as a string.
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.source}>Source: {article.source.name}</Text>
        <Text style={styles.date}>Date: {article.publishedAt}</Text>
        <Text style={styles.author}>Author: {article.author}</Text>
        {isLoading ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <Text style={styles.content}>{fullContent}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    marginBottom: 4,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    marginBottom: 4,
    color: 'gray',
  },
  author: {
    fontSize: 14,
    marginBottom: 8,
    color: 'gray',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default NewsDetailScreen;
