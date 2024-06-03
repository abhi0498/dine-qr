"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link as ChakraLink,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiUser,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Link from "next/link";
import getSession from "@/utils/session";
import { usePathname } from "next/navigation";
interface LinkItemProps {
  name: string;
  icon: IconType;
  path?: string;
  allowedPermissions?: string[];
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, path: "/" },
  {
    name: "Restaurants",
    icon: FiHome,
    path: "/restaurants",
    allowedPermissions: ["ManageRestaurants"],
  },
  {
    name: "Users",
    icon: FiUser,
    path: "/users",
    allowedPermissions: ["ManageUsers", "ManageRestaurantAdmins"],
  },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings, path: "/settings" },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/auth/session").then(async (res) => {
      const session = await res.json();
      setSession(session);
      setLoading(false);
    });
  }, []);

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Dine QR
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.filter((linkItem) => {
        if (!session) return true;
        if (!linkItem.allowedPermissions) return true;
        return linkItem.allowedPermissions.some((permission) =>
          session.role.permissions.find((p: any) => p.name === permission)
        );
      }).map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          path={link?.path || "#"}
          onClose={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path?: string;
  onClose: () => void;
}
const NavItem = ({ icon, path, onClose, children, ...rest }: NavItemProps) => {
  const currentPath = usePathname();
  const isActive = React.useMemo(() => {
    if (path === "/") return currentPath === path;
    return currentPath.includes(path || "");
  }, [path, currentPath]);
  return (
    <ChakraLink
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      as={Link}
      onClick={onClose}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        my="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        bg={isActive ? "cyan.400" : "transparent"}
        color={isActive ? "white" : "black"}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Dine QR
      </Text>
    </Flex>
  );
};
