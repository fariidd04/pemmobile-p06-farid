import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

const ProductCard = ({ item, isGrid = false }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const formatPrice = (price) => {
    return 'Rp ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const stars = '★'.repeat(full) + '☆'.repeat(5 - full);
    return stars;
  };

  const AlertModal = () => (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
        <Pressable style={styles.modalBox} onPress={() => {}}>
          <Text style={styles.modalTitle}>{item.name}</Text>
          <Text style={styles.modalPrice}>Harga: {formatPrice(item.price)}</Text>
          <Text style={styles.modalDetail}>Rating: ★ {item.rating}  |  {item.sold.toLocaleString()} terjual</Text>
          <View style={styles.modalDivider} />
          <TouchableOpacity
            style={styles.modalOkBtn}
            onPress={() => setModalVisible(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.modalOkText}>OK</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );

  if (isGrid) {
    return (
      <>
        <AlertModal />
        <TouchableOpacity
          style={styles.gridCard}
          activeOpacity={0.85}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.gridImageBox}>
            <Text style={styles.gridEmoji}>{item.image}</Text>
          </View>
          <View style={styles.gridInfo}>
            <Text style={styles.gridName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.gridCategory}>{item.category}</Text>
            <Text style={styles.gridPrice}>{formatPrice(item.price)}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.stars}>{renderStars(item.rating)}</Text>
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <>
      <AlertModal />
      <TouchableOpacity
        style={styles.listCard}
        activeOpacity={0.85}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.listImageBox}>
          <Text style={styles.listEmoji}>{item.image}</Text>
        </View>
        <View style={styles.listInfo}>
          <View style={styles.listTop}>
            <Text style={styles.listName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
          <Text style={styles.listPrice}>{formatPrice(item.price)}</Text>
          <View style={styles.listBottom}>
            <View style={styles.ratingRow}>
              <Text style={styles.stars}>{renderStars(item.rating)}</Text>
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.soldText}>{item.sold.toLocaleString()} terjual</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  modalDetail: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: -24,
  },
  modalOkBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  modalOkText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6C63FF',
    letterSpacing: 0.5,
  },

  listCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0EEFF',
  },
  listImageBox: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  listEmoji: {
    fontSize: 38,
  },
  listInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  listName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    lineHeight: 21,
  },
  categoryBadge: {
    backgroundColor: '#EDE9FF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6C63FF',
  },
  listPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6C63FF',
    marginTop: 6,
  },
  listBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    fontSize: 13,
    color: '#FFB800',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  soldText: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  gridCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 6,
    overflow: 'hidden',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0EEFF',
  },
  gridImageBox: {
    height: 110,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridEmoji: {
    fontSize: 50,
  },
  gridInfo: {
    padding: 12,
  },
  gridName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A2E',
    lineHeight: 18,
    marginBottom: 4,
  },
  gridCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6C63FF',
    marginBottom: 6,
  },
  gridPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 6,
  },
});

export default ProductCard;