import {
  Home,
  Search,
  Compass,
  Video,
  Send,
  Heart,
  PlusSquare,
  Menu,
  Settings,
  Activity,
  Sun,
  AlertTriangle,
  LogOut,
  Users,
  KeyRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import avatarImg from "@/assets/avatarImg.jpg";
import { useState } from "react";
import CreatePostModal from "./post/CreatePostModal";
export default function Sidebar({
  onOpenSearch,
}: {
  onOpenSearch?: () => void;
}) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [openCreate, setOpenCreate] = useState(false);
  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công");
    window.location.href = "/login";
  };

  const handleChangePassword = () => {
    navigate("/change/password");
  };

  const getProfilePictureUrl = (picture: string | null | undefined) => {
    if (!picture) return avatarImg;
    if (picture.startsWith("http")) return picture;
    // Nếu là relative path, thêm baseURL
    const baseURL = import.meta.env.VITE_API_URL;
    return `${baseURL}${picture}`;
  };

  const navigationItems = [
    { icon: <Home />, label: "Trang chủ", onClick: () => navigate("/") },
    { icon: <Search />, label: "Tìm kiếm", onClick: onOpenSearch },
    {
      icon: <Compass />,
      label: "Khám phá",
      onClick: () => navigate("/explore"),
    },
    { icon: <Video />, label: "Reels" },
    {
      icon: <Send />,
      label: "Tin nhắn",
      onClick: () => navigate("/messages"),
    },
    { icon: <Heart />, label: "Thông báo" },
    { icon: <PlusSquare />, label: "Tạo", onClick: () => setOpenCreate(true) },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={getProfilePictureUrl(user?.profilePicture)} />
          <AvatarFallback>
            {user?.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ),
      label: "Trang cá nhân",
      onClick: () => navigate(`/profile/${user?.username}`),
    },
  ];

  return (
    <aside
      className="
        hidden md:flex
        fixed left-0 top-0
        h-screen
        w-[72px] xl:w-[240px]
        flex-col
        border-r
        px-3 py-6
        bg-white
        z-50
        "
    >
      <div className="mb-8 px-2 flex items-center gap-3 text-xl font-bold">
        <Instagram className="w-6 h-6" />
        <span className="hidden xl:inline">Instagram</span>
      </div>

      <nav className="flex flex-col gap-3">
        {navigationItems.map((item, idx) => (
          <SidebarItem
            key={idx}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </nav>

      <div className="mt-auto px-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <SidebarItem icon={<Menu />} label="Xem thêm" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="start"
            className="w-64 rounded-xl p-2"
          >
            <DropdownMenuItem className="gap-3">
              <Settings className="w-4 h-4" />
              Cài đặt
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-3">
              <Activity className="w-4 h-4" />
              Hoạt động của bạn
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-3">
              <Heart className="w-4 h-4" />
              Đã lưu
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-3">
              <Sun className="w-4 h-4" />
              Chuyển chế độ
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-3">
              <AlertTriangle className="w-4 h-4" />
              Báo cáo sự cố
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-3" onClick={handleChangePassword}>
              <KeyRound className="w-4 h-4" />
              Đổi mật khẩu
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-3">
              <Users className="w-4 h-4" />
              Chuyển tài khoản
            </DropdownMenuItem>

            <DropdownMenuItem
              className="gap-3 text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CreatePostModal open={openCreate} onClose={() => setOpenCreate(false)} />
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </div>
  );
}
