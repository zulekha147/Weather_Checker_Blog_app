import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = require('./assets/blogposts.json');  // Load JSON data locally
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const getImageForBlog = (id) => {
    switch (id) {
      case 1:
        return require('./assets/images/weather-pattern.png');
      case 2:
        return require('./assets/images/impact.jpg');
      case 3:
        return require('./assets/images/bestapp.jpg');
      default:
        return require('./assets/images/bestapp.jpg'); // Add a default image
    }
  };

  const renderBlogItem = ({ item }) => (
    <View style={styles.blogItem}>
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Image source={getImageForBlog(item.id)} style={styles.blogImage} />
      <Text style={styles.blogCaption}>{item.caption}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blog Posts</Text>
      <FlatList
        data={blogs}
        renderItem={renderBlogItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginLeft: 100,
    marginBottom: 16,
    color: 'blue',
  },
  blogItem: {
    marginBottom: 16,
  },
  blogImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF', // Use hex code for light blue
    marginTop: 10,
    marginBottom: 20,
  },
  blogCaption: {
    fontStyle: 'italic',
    marginBottom: 8,
  },
});

export default App;
