import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

import { PRODUCTS, CATEGORIES } from './data/products';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

const SORT_OPTIONS = [
  { label: 'Relevan', value: 'default' },
  { label: 'Harga ↑', value: 'price_asc' },
  { label: 'Harga ↓', value: 'price_desc' },
  { label: 'Rating ↓', value: 'rating_desc' },
];

const VIEW_MODES = ['list', 'grid', 'section'];
const ListHeader = React.memo(({
  search,
  onChangeText,
  categories,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}) => (
  <View>
    <SearchBar value={search} onChangeText={onChangeText} />

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryScroll}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.chip,
            activeCategory === cat && styles.chipActive,
          ]}
          onPress={() => setActiveCategory(cat)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.chipText,
              activeCategory === cat && styles.chipTextActive,
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Sort Bar (E4) */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.sortScroll}
    >
      {SORT_OPTIONS.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          style={[
            styles.sortBtn,
            sortBy === opt.value && styles.sortBtnActive,
          ]}
          onPress={() => setSortBy(opt.value)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.sortText,
              sortBy === opt.value && styles.sortTextActive,
            ]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('list');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshCount((c) => c + 1);
    }, 1500);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'Semua') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [search, activeCategory, sortBy, refreshCount]);

  const sectionData = useMemo(() => {
    const catMap = {};
    filteredProducts.forEach((p) => {
      if (!catMap[p.category]) catMap[p.category] = [];
      catMap[p.category].push(p);
    });
    return Object.entries(catMap).map(([title, data]) => ({ title, data }));
  }, [filteredProducts]);

  const viewModeIcon = () => {
    if (viewMode === 'list') return '▦';
    if (viewMode === 'grid') return '☰';
    return '≡';
  };

  const cycleViewMode = () => {
    const idx = VIEW_MODES.indexOf(viewMode);
    setViewMode(VIEW_MODES[(idx + 1) % VIEW_MODES.length]);
  };

  const ListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>Produk tidak ditemukan</Text>
      <Text style={styles.emptyHint}>
        Coba kata kunci lain atau ubah filter kategori kamu
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <ProductCard item={item} isGrid={viewMode === 'grid'} />
  );

  const renderSectionHeader = ({ section: { title, data } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCount}>{data.length} produk</Text>
    </View>
  );

  const listHeaderComponent = (
    <ListHeader
      search={search}
      onChangeText={setSearch}
      categories={CATEGORIES}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🛒 ShopList</Text>
          <Text style={styles.headerSub}>
            {filteredProducts.length} produk ditampilkan
          </Text>
        </View>

        <TouchableOpacity
          style={styles.viewToggle}
          onPress={cycleViewMode}
          activeOpacity={0.8}
        >
          <Text style={styles.viewToggleText}>{viewModeIcon()}</Text>
          <Text style={styles.viewToggleLabel}>
            {viewMode === 'list' ? 'List' : viewMode === 'grid' ? 'Grid' : 'Section'}
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'section' ? (
        <SectionList
          sections={sectionData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} isGrid={false} />}
          renderSectionHeader={renderSectionHeader}
          ListHeaderComponent={listHeaderComponent}
          ListEmptyComponent={<ListEmpty />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#6C63FF']}
              tintColor="#6C63FF"
            />
          }
          contentContainerStyle={
            filteredProducts.length === 0 ? styles.emptyFlex : styles.listContent
          }
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          key={viewMode}
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={viewMode === 'grid' ? 2 : 1}
          columnWrapperStyle={viewMode === 'grid' ? styles.gridWrapper : null}
          ListHeaderComponent={listHeaderComponent}
          ListEmptyComponent={<ListEmpty />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#6C63FF']}
              tintColor="#6C63FF"
            />
          }
          contentContainerStyle={
            filteredProducts.length === 0 ? styles.emptyFlex : styles.listContent
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FF',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#6C63FF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: '#C4BCFF',
    marginTop: 2,
    fontWeight: '500',
  },
  viewToggle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  viewToggleText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  viewToggleLabel: {
    fontSize: 10,
    color: '#E0DAFF',
    fontWeight: '600',
    marginTop: 1,
  },

  listContent: {
    backgroundColor: '#F8F7FF',
    paddingBottom: 24,
  },
  emptyFlex: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },

  categoryScroll: {
    paddingHorizontal: 12,
    paddingBottom: 4,
    paddingTop: 2,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#E0DAFF',
  },
  chipActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },

  sortScroll: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 4,
  },
  sortBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0DAFF',
  },
  sortBtnActive: {
    backgroundColor: '#EDE9FF',
    borderColor: '#6C63FF',
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  sortTextActive: {
    color: '#6C63FF',
  },

  gridWrapper: {
    paddingHorizontal: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#EDE9FF',
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4A3EBF',
  },
  sectionCount: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
  },
});