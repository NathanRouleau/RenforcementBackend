import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const statutStyle: Record<string, { bg: string; text: string }> = {
  'En attente de validation': { bg: '#FAEEDA', text: '#854F0B' },
  'Brouillon':                { bg: '#F1EFE8', text: '#5F5E5A' },
  'Validé':                   { bg: '#EAF3DE', text: '#3B6D11' },
  'Refusé':                   { bg: '#FCEBEB', text: '#A32D2D' },
};

export default function StatusBadge({ statut }: { statut: string }) {
  const style = statutStyle[statut] ?? { bg: '#F1EFE8', text: '#5F5E5A' };

  return (
    <View style={[styles.badge, { backgroundColor: style.bg }]}>
      <Text style={[styles.badgeText, { color: style.text }]}>{statut}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
