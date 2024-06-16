// src/main/java/com/example/application/endpoints/ChatEndpoint.java
package com.example.application.data.endpoints;

import com.example.application.data.entity.ChatRoom;
import com.example.application.data.entity.Message;
import com.example.application.data.entity.User;
import com.example.application.data.service.ChatService;
import com.example.application.data.service.UserService;
import com.example.application.db.Contact;
import com.example.application.services.CRMService.CompanyRecord;
import com.example.application.services.CRMService.ContactRecord;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Endpoint;
import reactor.core.publisher.Flux;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@BrowserCallable
@AnonymousAllowed
public class ChatEndPoint {

    private final ChatService chatService;
    private final UserService userService;
    public record RoomRecord(
        Long id,
        @NotNull
        UserRecord user1,
        @NotNull
        UserRecord user2
    ){}
    public record UserRecord(
        Long id,
        @NotNull
        String account,
        @NotNull
        String password,
        @NotNull
        String username,
        @NotNull
        String gender,
        @NotNull
        String mbti,
        @Email
        @NotNull
        String email
    ){}
    public record MessageRecord(
        Long id,
        @NotNull
        String username,
        @NotNull
        String content,
        @NotNull
        Instant timestamp
    ){}
    private UserRecord toUserRecord(User u){
        return new UserRecord(
            u.getId(),
            u.getAccount(),
            u.getPassword(),
            u.getUsername(),
            u.getGender(),
            u.getMbti(),
            u.getEmail()
        );
    }
    private RoomRecord toRoomRecord(ChatRoom c) {
        return new RoomRecord(
                c.getId(),
                new  UserRecord(c.getUser1().getId(),
                                c.getUser1().getAccount(),
                                c.getUser1().getPassword(),
                                c.getUser1().getUsername(),
                                c.getUser1().getGender(),
                                c.getUser1().getMbti(),
                                c.getUser1().getEmail()
                                ),              
                new  UserRecord(c.getUser2().getId(),
                                c.getUser2().getAccount(),
                                c.getUser2().getPassword(),
                                c.getUser2().getUsername(),
                                c.getUser2().getGender(),
                                c.getUser2().getMbti(),
                                c.getUser2().getEmail()
                                )           

        );
    }
    
    public ChatEndPoint(ChatService chatService, UserService userService) {
        this.chatService = chatService;
        this.userService = userService;
    }
    public void enterRoom(Long chatRoomId, String username) {
        ChatRoom chatRoom = chatService.getChatRoomById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("Chat room not found"));
        User sender = userService.getUserByUsername(username);
       chatService.enterRoom(chatRoomId, sender);
    }
    public List<RoomRecord> getUserChatRooms(String username) {
        User user = userService.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
               return chatService.getUserChatRooms(user).stream()
            .map(this::toRoomRecord) // Convert to ChatRoom objects
            .collect(Collectors.toList()); // Collect into a List

    }

    public ChatRoom createChatRoom(Long userId1, Long userId2) {
        User user1 = userService.getUserById(userId1);
        User user2 = userService.getUserById(userId2);
        return chatService.createChatRoom(user1, user2);
    }

    public List<ChatService.MessageRecord> getMessages(Long chatRoomId) {
        ChatRoom chatRoom = chatService.getChatRoomById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("Chat room not found"));
        return chatService.getMessages(chatRoom);
    }
 
    public ChatService.MessageRecord sendMessage(Long chatRoomId, String username, String content) {
        ChatRoom chatRoom = chatService.getChatRoomById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("Chat room not found"));
        User sender = userService.getUserByUsername(username);
        return chatService.sendMessage(chatRoomId, sender, content);
         // Convert to ChatRoom objects // Collect into a List;
    }

    public Flux<ChatService.MessageRecord> joinChatRoom(Long chatRoomId) {
        return chatService.joinChatRoom(chatRoomId);
    }

    public UserRecord getOtherUserInChatRoom(Long chatRoomId, String username) {
        return toUserRecord(chatService.getOtherUserInChatRoom(chatRoomId, username));
    }
}