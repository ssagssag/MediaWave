
type CategoryTapProps = {
  activeTab: number;
  onTabChange: (index: number) => void;
};

interface NavProps {
  className?: string;
  activeTab: number;
  onTabChange: (tabIndex: number) => void;
}
